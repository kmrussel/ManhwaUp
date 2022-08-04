import React from 'react';
import Genre from '../components/Genre';
import FeaturesText from '../components/FeaturesText';
import GetGenre from '../components/GetGenre';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

function HomePage( {setManhwaToShow, setGenreToShow }) {
    const genreHome = ["Fantasy", "Romance", "Action", "Drama"]
    return (
        <>
  
            <h2>Basic Features</h2>
            <FeaturesText/>
            <h2>By Genre</h2>
            {genreHome.map((genre, i) => <Genre genre={genre}
            setManhwaToShow ={setManhwaToShow}
            key={i} />)}
            {/* <GetGenre setGenreToShow={setGenreToShow} setManhwaToShow={setManhwaToShow} Component={Genre}></GetGenre> */}

        </>
    );

    
}

export default HomePage;