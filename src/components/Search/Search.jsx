import useDebounce from '../../hooks/debounce';
import './Search.css';

function Search(updateSearchTerm){

    const debounceUpdateSearch=useDebounce((e)=>updateSearchTerm(e.target.value));
    return(
        <input 
        id="search-pokemon"
        type="text" 
        placeholder="which pokemon you are looking for"
        onChange={debounceUpdateSearch}
        />
    )
}
export default Search;