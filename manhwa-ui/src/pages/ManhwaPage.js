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
            {title}
            {image}
            {authors}
            {date}
            {genres}
            {description}
        </div>
    )

}

export default ManhwaPage; 