import React from 'react';
import ManhwaList from './ManhwaList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Genre({ genre, setManhwaToShow, genreShown, limit }) {
    const [manhwas, setManhwas] = useState([]);
    const navigate = useNavigate();

    // fetch manhwas by specific genre
    const loadManhwas = async () => {
        const params = { "genres": `${genre}`, limit: limit };
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
        navigate(`/manhwa/${manhwa.title}`);
    }

    useEffect(() => {
        loadManhwas();
    }, [])


    return (
        <>
            <hr className="genre-border" />
            <section className='genre-sec'>
                <h3>{genre}</h3>
                <Link to={`/genre/${genre}`} genre={genre}> &gt; more from {genre}</Link>
            </section>
            <hr />
            <br></br>
            <section className="display-manhwa">
                <ManhwaList manhwas={manhwas} manhwaShown={manhwaShown} genreShown={genreShown}></ManhwaList>
            </section>





        </>
    );
}

export default Genre;
