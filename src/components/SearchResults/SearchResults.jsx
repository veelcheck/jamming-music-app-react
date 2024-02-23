import TrackList from '../TrackList/TrackList.jsx';
import Error from '../Error/Error.jsx';
import './SearchResults.css';
import ArrowUp from '@mui/icons-material/SubdirectoryArrowRight';

function SearchResults({ tracks, handleTrack, searching, setPlaylistTracks, errorMessage }) {
  return (
    <div className='results' role='region' aria-live='polite' aria-label='Search Results'>
      {searching ? (
        <h2 aria-busy='true'>Searching high and low...</h2>
      ) : (
        errorMessage ? <Error errorMessage={errorMessage}/> : (
          tracks.length === 0 ? (<h2>Go to search box, and search away! <ArrowUp className='arrow' fontSize="large"/></h2>) : (<>
            <h2>We found these for you:</h2>
            <ul className='search-results'>
              <TrackList 
                className='track' 
                tracks={tracks}
                handleTrack={handleTrack}
                setPlaylistTracks={setPlaylistTracks}
              />
            </ul>
        </>)
        )
      )}
    </div>
  );
}

export default SearchResults;