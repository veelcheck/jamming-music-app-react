async function search(searchTerm, setSearchTerm, setErrorMessage, setSearching, URL_BASE, setTracksList, accessToken) {
  if (searchTerm.trim() === '') {
    // If the input is empty or contains only whitespace, do not proceed with the search
    setErrorMessage(`C'mon, to see anything here you have to give me a name! Don't be shy.`);
    localStorage.removeItem('searchResults');
    return;
  }
  setSearching(true); // Set loading state to true
    const searchParam = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    try {
      // Getting the artist by their id
      const responseArtist = await fetch(`${URL_BASE}search?q=${searchTerm}&type=artist`, searchParam);
      const dataArtist = await responseArtist.json();
      const artistId = dataArtist.artists.items[0].id; 
      
      // Getting the top tracks
      const responseTrackList = await fetch(`${URL_BASE}artists/${artistId}/top-tracks?market=US`, searchParam);
      const dataTrackList = await responseTrackList.json();
      // Save search results so they can be displayed on reload.
      localStorage.setItem('searchResults', JSON.stringify(dataTrackList.tracks));
      setTracksList(dataTrackList.tracks);
    } catch (error) {
        console.error(`Something funny happened: ${error}`);
        setErrorMessage('Something went wrong. Try again.')
    } finally {
        setSearching(false); // Reset loading state after the search operation completes
        setSearchTerm(''); // Reset input field after submisson
        setErrorMessage(''); // Clear the error message
    }
  }

  export default search;