import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReadingList from './ReadingList'
import Grid from "@material-ui/core/Grid";

const User = ({ user, setManhwaToShow }) => {
    const [username] = useState(user.username)
    const [readingList] = useState(user.readingList)

    const navigate = useNavigate();


    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        navigate(`/manhwa/${manhwa.title}`);
    }

    return (
        <>  
            
            Welcome {username}!
            <p>Reading List</p>
            <Grid container spacing={3}>
                {/* {list.map((manhwa, i) => {
                    
                    <ReadingList manhwa={manhwa} manhwaShown={manhwaShown} key={i}
                    />
                })}
   */}
            </Grid>
        </>


    )
}

export default User