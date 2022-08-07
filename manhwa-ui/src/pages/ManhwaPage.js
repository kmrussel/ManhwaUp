import React, { useState } from 'react'
import Image from '../components/Image'
import Description from '../components/Description'
import ReadingListButton from '../components/ReadingListButton'

export const ManhwaPage = ({ manhwaToShow, userStatus }) => {
    const [id] = useState(manhwaToShow._id)
    const [title] = useState(manhwaToShow.title);
    const [authors] = useState(manhwaToShow.authors);
    const [date] = useState(manhwaToShow.date);
    const [genres] = useState(manhwaToShow.genres);
    const [url] = useState(manhwaToShow.url);


    return (
        <div>

            <Image url={url} />
            <Description url={url} />
            <h2>{title}</h2>
            <ul>
                <li>Author(s): {authors}</li>
                <li>Released: {date}</li>
                <li>{genres}</li>
                <li>Summary: </li>
            </ul>
            <ReadingListButton userStatus={userStatus} id={id} buttonmsg={'Add to reading list'} />
        </div>
    )

}

export default ManhwaPage; 