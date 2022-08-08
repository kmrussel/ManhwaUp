import React from 'react';
import FilterByGenres from '../components/FilterByGenres';

import { useParams } from 'react-router-dom';

function GenrePage({ setManhwaToShow }) {
    const { genres } = useParams();
    return (
        <>
            <h2>Explore: {genres}</h2>
            <FilterByGenres genre={genres} setManhwaToShow={setManhwaToShow} limit={0} />
        </>

    )
}

export default GenrePage; 