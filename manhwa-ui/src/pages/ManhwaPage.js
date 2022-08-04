import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';


export const ManhwaPage = ( { manhwaToShow } ) => {
    const [title] = useState (manhwaToShow.title);
    const [image] = useState (manhwaToShow.image);
    const [authors] = useState(manhwaToShow.authors);
    const [date] = useState(manhwaToShow.date);
    const [genres] = useState(manhwaToShow.genres);
    const [description] = useState(manhwaToShow.description);


    return(
        <div>
            
            {/* <img src= {require( `../manhwaImages/${image}`).default} height={250} width={150} ></img> */}
            
            <h2>{title}</h2>
            <ul>
                <li>Author(s): {authors}</li>
                <li>Released: {date}</li>
                <li>{genres}</li>
                <li>Summary: {description}</li>
            </ul>
        </div>
    )

}

export default ManhwaPage; 