export default async function createSpotifyPlaylist (playListName, trackIDs, accessToken) {
  if (Array.isArray(trackIDs) && trackIDs.length) {
    const createPlayListURL = `https://api.spotify.com/v1/me/playlists`;
    const response = await fetch(createPlayListURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        name: playListName,
        public: true
      })
    })

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating playlist:', errorData.error);
      // Handle the error (e.g., display a message to the user)
      return;
    }

    const jsonResponse = await response.json();
    const playListID = jsonResponse.id;

    if (playListID) {
      const replacePlayListTracksURL = `https://api.spotify.com/v1/playlists/${playListID}/tracks`;
      
      await fetch(replacePlayListTracksURL, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        body : JSON.stringify({uris: trackIDs.map(id => "spotify:track:".concat(id))})
      });
    }
  }
}