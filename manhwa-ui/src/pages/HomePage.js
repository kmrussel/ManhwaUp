import React from 'react';
import Genre from '../components/Genre';
import FeaturesText from '../components/FeaturesText';
import useAuth from '../hooks/useAuth';

function HomePage({ setManhwaToShow, setGenreToShow }) {
    const genreHome = ["Fantasy", "Romance", "Action", "Drama"]
    const { auth } = useAuth();

    return (
        <div className="home">
            <h1>Basic Features</h1>
            <section className="features">
                <FeaturesText />
            </section>
            <h2>Top Genres</h2>
            {genreHome.map((genre, i) => <Genre genre={genre}
                setManhwaToShow={setManhwaToShow} limit={5}
                key={i} />)}

        </div>
    );


}

export default HomePage;