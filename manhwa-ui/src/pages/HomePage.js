import React from 'react';
import Genre from '../components/Genre';
import GetGenre from '../components/GetGenre';


function HomePage( {setManhwaToShow, setGenreToShow }) {
    const genreHome = ["Fantasy", "Romance"]
    return (
        <>
            <h2>Staff's Top Picks</h2>
            <h2>By Genre</h2>
            {genreHome.map((genre, i) => <Genre genre={genre}
            setManhwaToShow ={setManhwaToShow}
            key={i} />)}
            {/* <GetGenre setGenreToShow={setGenreToShow} setManhwaToShow={setManhwaToShow} Component={Genre}></GetGenre> */}

        </>
    );

    
}

export default HomePage;