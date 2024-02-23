async function saveToSpotify(setButtonText, createSpotifyPlaylist, setErrorMessage, authRequestUrl, accessToken, setPlaylistTracks) {
  // Change button text while processing.
  setButtonText('Saving...');

  try {
    await createSpotifyPlaylist(accessToken);
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

export default saveToSpotify;
