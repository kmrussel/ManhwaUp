import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManhwaList from '../components/ManhwaList';
import { Link } from 'react-router-dom';

function ResultsPage({ setManhwaToShow }) {
    const filter = useParams();
    const genre = JSON.parse(Object.values(filter));
    const genreStr = [];

    // set genre fitler to array 
    for (const element of genre) {
        genreStr.push(element)
    };

    const [manhwas, setManhwas] = useState([]);
    const navigate = useNavigate();

    // get manhwas based on filter 
    const loadManhwas = async () => {
        const params = { "genres": genreStr };
        const options = {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch('/manhwas/filter', options)
        const data = await response.json()
        setManhwas(data);
    };

    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        navigate(`/manhwa/${manhwa.title}`);
    }

    useEffect(() => {
        loadManhwas()
    }, [])


    return (
        <>
            <h2>Results for {genreStr.join(", ")}</h2>
            <i>Not what you wanted?</i>
            <br></br>
            <Link to={`/browse-all`}>Go back to browse all</Link>
            <ManhwaList manhwas={manhwas} manhwaShown={manhwaShown}></ManhwaList>

        </>

    )
}

export default ResultsPage;