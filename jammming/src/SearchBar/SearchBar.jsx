import React, {useState} from 'react';
import { useCallback } from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [term, setTerm] = useState("");
    const search = useCallback(() => {
        props.search(term);
    }, [props.search, term]);

    return (
        <div className="SearchBar">
            <input
                placeholder="Enter A Track"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
            />
            <button onClick={search} className="SearchButton">SEARCH</button>
        </div>
    );

}

export default SearchBar;