export default function addTrack(track, setPlaylistTracks) {
  setPlaylistTracks(savedTracks => {
    if (savedTracks.includes(track)) {
      return savedTracks;
    } else {
      const newTracks = [...savedTracks, track];
      localStorage.setItem('playListTracks', JSON.stringify(newTracks));
      return newTracks;
    }
  });
}