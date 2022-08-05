import React from 'react';
import Genre from '../components/Genre';
import FeaturesText from '../components/FeaturesText';
import useAuth from '../hooks/useAuth';

function HomePage( {setManhwaToShow, setGenreToShow }) {
    const genreHome = ["Fantasy", "Romance", "Action", "Drama"]
    const { auth } = useAuth(); 

    console.log(auth.email)
    return (
        <>
  
            <h2>Basic Features</h2>
            <FeaturesText/>
            <h2>By Genre</h2>
            {genreHome.map((genre, i) => <Genre genre={genre}
            setManhwaToShow ={setManhwaToShow}
            key={i} />)}

        </>
    );

    
}

export default HomePage;