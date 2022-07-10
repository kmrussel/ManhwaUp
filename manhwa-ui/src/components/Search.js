import React from 'react';
import {useHistory} from 'react-router-dom';

function Search() {
    const history = useHistory(); 

    const getSearch = async (e) => {
        e.preventDefault(); 
        const search = document.getElementById('header-search').value;
        document.getElementById("search-form").reset();
        history.push(`/search-results/${search}`)
    }

    return (
        <form id="search-form">
            <input
                type="text"
                id="header-search"
                tag="search"
                placeholder="Search for manhwa"
                name="s"
            />
            <button type ="button" onClick ={getSearch}>Search</button>
        </form>
    )
}

export default Search; 