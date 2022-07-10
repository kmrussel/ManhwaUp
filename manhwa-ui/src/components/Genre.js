import React from 'react';
import ManhwaList from './ManhwaList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Genre( { genre, setManhwaToShow, genreShown}) {
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
            history.push(`/manhwa/${manhwa.title}`);
        }
    
        useEffect(() => {
            loadManhwas()
        }, [])
        
        const test = JSON.stringify({"genres": `${genre}`})
        const ah = typeof test
    return (
        <>
            <p>{genre}</p>
            {test}
            {ah}
            <ManhwaList manhwas={manhwas} manhwaShown = {manhwaShown} genreShown={genreShown}></ManhwaList>

            <Link to= {`/genre/${genre}`} genre={genre}>more</Link>
        </>
    );
}

export default Genre;
