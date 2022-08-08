import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReadingList from './ReadingList'
import Grid from "@material-ui/core/Grid";

const User = ({ user, setManhwaToShow, userStatus }) => {
    const [username] = useState(user.username)
    const [readingList] = useState(user.readingList)

    const navigate = useNavigate();

    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        navigate(`/manhwa/${manhwa.title}`);
    }

    return (
        <div className="user-page">

            <h2>Welcome {username}!</h2>
            <h4>Reading List</h4>
            <section className="reading-list">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Manhwa</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {readingList.map((manhwaID, i) => <ReadingList manhwaID={manhwaID} manhwaShown={manhwaShown} key={i} index={readingList.indexOf(manhwaID)} userStatus={userStatus} />)}
            
            </tbody>
            </section>


        </div>


    )
}

export default User