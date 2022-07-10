import React from 'react';

function Filter( { genre } ) {

    return (
        <div>
            <input
            type="checkbox"
            id="genreFiltercb"
            name="genre"
            value={genre}
            ></input>
            <label id="genreFilter" for="genreFiltercb">{genre}</label>
        </div>
    )
};

export default Filter;
