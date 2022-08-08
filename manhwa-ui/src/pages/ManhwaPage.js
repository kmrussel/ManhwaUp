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
    const [manhwaStatus] = useState(manhwaToShow.manhwaStatus)
    const [url] = useState(manhwaToShow.url);


    return (
        <div className="Manhwa-page">
            <section className="manhwa-general-info">
                <Image url={url} height={300} width={210} />
                <section>
                    <h2>{title}</h2>
                    <p>Author(s): {authors.join(", ")}</p>
                    <p>Released {date} • {manhwaStatus}</p>
                    <p>Genres: {genres.join(", ")}</p>
                </section>
            </section>

            <Description url={url} />
            <ReadingListButton userStatus={userStatus} id={id} buttonmsg={'Add to reading list'} />
        </div>
    )

}

export default ManhwaPage; 