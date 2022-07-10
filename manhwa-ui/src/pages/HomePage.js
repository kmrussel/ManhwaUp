import React from 'react';
import Genre from '../components/Genre';
import GetGenre from '../components/GetGenre';


function HomePage( {setManhwaToShow, setGenreToShow }) {

    return (
        <>
            <h2>Staff's Top Picks</h2>
            <h2>By Genre</h2>
            <GetGenre setGenreToShow={setGenreToShow} setManhwaToShow={setManhwaToShow} Component={Genre}></GetGenre>

        </>
    );

    
}

export default HomePage;