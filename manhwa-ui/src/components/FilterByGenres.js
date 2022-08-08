import React from 'react';
import ManhwaList from './ManhwaList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function FilterByGenres({ genre, setManhwaToShow, genreShown }) {
    const [manhwas, setManhwas] = useState([]);
    const navigate = useNavigate();

    // fetch manhwas by specific genre
    const loadManhwas = async () => {
        const params = { "genres": `${genre}`};
        const options = {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch('/manhwas/genres', options);
        const data = await response.json();
        setManhwas(data);
    };

    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        navigate(`/manhwa/${manhwa}`);
    }

    useEffect(() => {
        loadManhwas();
    }, [])


    return (
        <>

            <ManhwaList manhwas={manhwas} manhwaShown={manhwaShown} genreShown={genreShown}></ManhwaList>

        </>
    );
}

export default FilterByGenres;
