import React from 'react';
import ManhwaList from './ManhwaList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function FilterByGenres( { genre, setManhwaToShow, genreShown}) {
    const [manhwas, setManhwas] = useState([]);
    const history = useHistory(); 

    const loadManhwas = async () => {
        const params = {"genres": `${genre}`};
        const options = {
            method: 'POST',
            body: JSON.stringify( params ),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch('/manhwas/genres', options)
        const data = await response.json()
        setManhwas(data);
    };

    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        history.push(`/manhwa/${manhwa}`);
    }

    useEffect(() => {
        loadManhwas()
    }, [])

    
return (
    <>
        
        <ManhwaList manhwas={manhwas} manhwaShown = {manhwaShown} genreShown={genreShown}></ManhwaList>

    </>
);
}

export default FilterByGenres;
