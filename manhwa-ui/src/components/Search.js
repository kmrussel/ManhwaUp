import React from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();

    const getSearch = async (e) => {
        e.preventDefault();
        const search = document.getElementById('header-search').value;
        document.getElementById("search-form").reset();
        navigate(`/search-results/${search}`)
    }

    return (
        <form id="search-form" className="search-form">
        <input
            type="text"
            id="header-search"
            tag="search"
            placeholder="Search for manhwa"
            name="s"
        />
        <button type="button" onClick={getSearch}>Search</button>
    </form>
    )
}

export default Search; 