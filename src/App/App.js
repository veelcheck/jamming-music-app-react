import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import SearchResults from '../components/SearchResults/SearchResults.jsx';
import PlayList from '../components/PlayList/PlayList.jsx';
import Login from '../components/Login/Login.jsx';
import Footer from '../components/Footer/Footer.jsx';
import './App.css';
import { clientId, clientSecret, URL_BASE, authRequestUrl, redirectUri} from '../config.js';
import handleLogin from '../util/handleLogin.js';
import createSpotifyPlaylist from '../util/spotifyApiUtils.js';
import addTrack from '../util/addTrack.js';
import removeTrack from '../util/removeTrack.js';
import search from '../util/search.js';

function App() {
  const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken') || '');
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      const newAccessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Set a timeout to clear the access token when it expires
      const expirationTime = expiresIn * 1000;
      window.setTimeout(() => localStorage.removeItem('accessToken'), expirationTime);

      // Clear the parameters from the URL
      window.history.pushState('Access Token', null, '/');

      // Update the access token in the state and localStorage
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
    } else {
      // If access token is not present in the URL, redirect to Spotify for authorization
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  }, []);

  useEffect(() => {
    // Check if the URL contains the authorization code after the user logs in
    console.log('Checking for authorization code or refresh token...');
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      // Exchange the authorization code for an access token and refresh token
      const tokenRequestParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`
      };
      // Make a request to Spotify API to exchange the authorization code for tokens
      fetch('https://accounts.spotify.com/api/token', tokenRequestParams)
        .then(response => response.json())
        .then(data => {
          const newAccessToken = data.access_token;
          
          // Update the access token in the state and localStorage
          setAccessToken(newAccessToken);
          localStorage.setItem('accessToken', newAccessToken);
        })
        .catch(error => {
          //window.location = '/'
          console.error('Error exchanging authorization code for token:', error);
          setErrorMessage('Error exchanging authorization code for token.')
        });
    } 
  }, []);
  
  // Render last search results on refresh
  useEffect(() => {
    const storedSearchResults = localStorage.getItem('searchResults');
    if (storedSearchResults) {
      setTracksList(JSON.parse(storedSearchResults));
    }
  }, []);

  const [ playListTracks, setPlaylistTracks ] = useState(JSON.parse(localStorage.getItem('playListTracks')) || []);
  const [ buttonText, setButtonText ] = useState('Save to Spotify');

  async function saveToSpotify(name, trackIDs) {
    // Change button text while processing.
    setButtonText('Saving...');
  
    try {
      await createSpotifyPlaylist(name, trackIDs, accessToken);
      setPlaylistTracks(savedTracks => [...savedTracks]);
      // Change button text back to the original after successful save
      setButtonText('Save to Spotify');
    } catch (error) {
      console.error('Error saving to Spotify:', error);
      setErrorMessage('Cound not save to Spotify.')

      if (error.response && error.response.status === 401) {
        // Handle unauthorized error (e.g., expired access token)
        setButtonText('Save to Spotify');
        // Redirect the user to the login page
        window.location.href = authRequestUrl;
      } else {
        setButtonText('Save to Spotify');
        alert('An error occurred while saving to Spotify. Please try again later.');
      }
    }
  }

  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searching, setSearching ] = useState(false);
  const [ tracksList, setTracksList] = useState([]);

  return (
    <>
    <div className='App' role='application'>
      <h1>Jamming<br></br><span className='subheading'>music spot-on</span></h1>

      {accessToken ? (
        <>
          {/* Render the search bar and panel when access token is available */}
          <SearchBar 
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            errorMessage={errorMessage}
            onClick={() => { 
              search(searchTerm, setSearchTerm, setErrorMessage, setSearching, URL_BASE, setTracksList, accessToken);
              }
            } 
            onKeyDown={event => {
              if (event.key === 'Enter') {
                search(searchTerm, setSearchTerm, setErrorMessage, setSearching, URL_BASE, setTracksList, accessToken);
              }
            }
          }
          />
          <div className='panel' role='region' aria-labelledby='searchResultsLabel playListLabel'>
            <SearchResults 
              tracks={tracksList} 
              handleTrack={addTrack}
              searching={searching}
              setPlaylistTracks={setPlaylistTracks}
              playListTracks={playListTracks}
              errorMessage={errorMessage}
            />
            <PlayList   
              tracks={playListTracks} 
              handleTrack={removeTrack} 
              saveToSpotify={saveToSpotify}
              buttonText={buttonText}
              setPlaylistTracks={setPlaylistTracks}
            />
          </div>
        </>
      ) : (
        /* Render the login button when access token is not available */
        <Login onClick={handleLogin}>Log in with Spotify</Login>
      )}
    </div>
    <Footer />
    </>
  );
}

export default App;
