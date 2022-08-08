import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GetGenre({setGenreToShow, setManhwaToShow, Component}) {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate(); 

    // fetch all distinct genres 
    const loadGenres = async () => {
        const response = await fetch('/genres')
        const data = await response.json()
        setGenres(data);
    };

    const genreShown = genre => {
        setGenreToShow(genre);
        navigate('/genre');
    }

    useEffect(() => {
        loadGenres();
    }, [])

    return(
        <>
            {genres.map((genre, i) => <Component genre={genre}
            genreShown = {genreShown}
            setManhwaToShow ={setManhwaToShow}
            key={i} />)}
        </>

    )
}

export default GetGenre; 