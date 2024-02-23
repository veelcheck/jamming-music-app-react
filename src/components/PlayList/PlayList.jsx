import './PlayList.css';
import Track from '../Track/Track';
import { useState, useEffect } from 'react';

function PlayList({ tracks, handleTrack, saveToSpotify, buttonText, setPlaylistTracks }) {
  const [ playListName, setPlayListName ] = useState('');

  // Load saved playlist from localStorage on component mount
  useEffect(() => {
    const savedPlayListName = localStorage.getItem('playListName');
    if (savedPlayListName) {
      setPlayListName(savedPlayListName);
    } 
  },[]);

  // Save playlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('playListName', playListName);
  },[playListName]);

  const name = tracks.map(track => track.artists.map(artist => artist.name).join(', '));

  function clearPlaylist() {
    setPlayListName('');
    setPlaylistTracks([]);

    localStorage.removeItem('playListName');
    localStorage.removeItem('playListTracks');
  }
  return (
    <div className='play-list' role="region" aria-labelledby="playlistLabel">
      {tracks.length > 0 && (
        <div className='wrapper'>
        <label className='sr-only' id="playlistLabel" htmlFor="playlist-name"></label>
        <input
          id="playlist-name"
          placeholder="Your list"
          value={playListName}
          onChange={({ target }) => setPlayListName(target.value)}
        />
        <hr className='custom-hr'></hr>
      </div>
      )}
      
        {tracks.map(track => {
          return (
            <li className='playlist-track' key={track.id}>
              <Track 
                track={track}
                name={name} 
                title={track.name} 
                album={track.album.name} 
                published={(track.album.release_date).slice(0, 4)}
                actionSymbol="-"
                handleTrack={handleTrack}
                setPlaylistTracks={setPlaylistTracks}
              />
            </li>
          )
        })
      } 

      {tracks.length > 0 && (
        <button  
          onClick={() => saveToSpotify(playListName, tracks.map(track => track.id))}
          aria-label={`Save playlist ${playListName} to Spotify`}
        >{buttonText}</button>
      )}
      {tracks.length > 0 && (
        <button 
          onClick={clearPlaylist}
          aria-label="Clear Playlist"
        >Clear Playlist</button>
      )}
    </div>
  )
}

export default PlayList;