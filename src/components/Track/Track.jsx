import './Track.css';

function Track({ title, album, published, track, handleTrack, actionSymbol, setPlaylistTracks }) {
  const artistName = track.artists.map(artist => artist.name).join(', ');

    return (
      <div className='individual-track' role="listitem">
        <h3 className="accent">{artistName}</h3>
        <div className="grid">
          <div className="track-info">{`${title} | `}<span className="accent">{`${album}`}</span>{`, ${published}`}</div>
          <div 
            className='action-symbol' 
            role="button"
            onClick={() => handleTrack(track, setPlaylistTracks)}
            aria-label={`If in search-results add ${title} by ${artistName} to playlist. If in playlist remove ${title} by ${artistName} from playlist.`}
            >{actionSymbol}</div>
        </div>
      </div>
    )
    }

export default Track;
