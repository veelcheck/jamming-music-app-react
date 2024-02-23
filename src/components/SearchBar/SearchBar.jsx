import './SearchBar.css';


function SearchBar({ onClick, onKeyDown, value, onChange }) {
  
  return (
    <div className='search-panel'>
      <label className="sr-only" htmlFor="search"></label>
      <input
        className="input"
        id="search"
        placeholder="Type in the artist..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        aria-label="Search"
      />
        <button
        className="search-button"
        aria-label="Search"
        onClick={onClick}
      >Search
      </button>
    </div>
  )
}

export default SearchBar;
