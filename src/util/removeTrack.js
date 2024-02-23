export default function removeTrack(track, setPlaylistTracks) {
  setPlaylistTracks(savedTracks => {
    const newTracks = savedTracks.filter(savedTrack => savedTrack !== track);
    localStorage.setItem('playListTracks', JSON.stringify(newTracks));
      return newTracks;
  });
}