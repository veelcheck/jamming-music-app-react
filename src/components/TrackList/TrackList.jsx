import Track from "../Track/Track.jsx";
import './TrackList.css';


function TrackList({ tracks, handleTrack, setPlaylistTracks }) {
  
  return (
    <div>
      {tracks.map((track) => 
        (<li key={track.id}>
          <Track 
            track={track}
            title={track.name} 
            album={track.album.name} 
            published={(track.album.release_date).slice(0, 4)}
            actionSymbol="+"
            handleTrack={handleTrack}
            setPlaylistTracks={setPlaylistTracks}
          />
        </li>))}
    </div>
  )
}

export default TrackList;
