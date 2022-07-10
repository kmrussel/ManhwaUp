import React from 'react';
import ManhwaList from '../components/ManhwaList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GetGenre from '../components/GetGenre';
import Filter from '../components/Filter'
import Genre from '../components/Genre';


function BrowseAllPage( {setManhwaToShow, setGenreToShow }) {
    const [manhwas, setManhwas] = useState([]);
    const history = useHistory(); 
    
    const loadManhwas = async () => {
        const response = await fetch('/manhwas')
        const data = await response.json()
        setManhwas(data);
    };

    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        history.push(`/manhwa/${manhwa}`);
    }

    useEffect(() => {
        loadManhwas();
    }, [])

    function getFilter () {
    
        let checkboxes = document.querySelectorAll('input[name="genre"]:checked');
        let filter = [];
        checkboxes.forEach((checkbox) => {
            filter.push(checkbox.value);
        })
        
        const genresFilter =JSON.stringify(filter);
        history.push(`/results/${genresFilter}` )
    }

    return (
        <body>
            <form>
                <fieldset>
                    <legend>Filter by genre</legend>
                    <GetGenre setGenreToShow={setGenreToShow} setManhwaToShow={setManhwaToShow} Component={Filter}></GetGenre>
                </fieldset>
                <button id="btn" type="submit" onClick ={getFilter} 
                >Go</button>

            </form>
            
            <h2>Explore All</h2>
            
            <ManhwaList manhwas={manhwas} manhwaShown = {manhwaShown}></ManhwaList>
            
        </body>
    );
}

export default BrowseAllPage;