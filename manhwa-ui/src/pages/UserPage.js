import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function UserPage ({showUser, logInStatus}) {
    const [username] = useState (showUser.username);
    const [status] = useState(logInStatus);

    const cookies = new Cookies(); 
    const history = useHistory(); 
    const token = cookies.get("TOKEN");
    // useEffect( () => {
    //     // await fetch('/auth-endpoint', {
    //     //     method: 'GET',
    //     //     headers: {
    //     //         Authorization: `Bearer ${token}`
    //     //     }

    //     // })
    //     axios({
    //         method:'get',
    //         url: '/auth-endpoint',
    //         headers:{
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     .then((result) => {
    //         console.log('wtf')
    //         console.log(result.data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }, []);




  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    history.push('/home')
  }

    return (
        <div>
            {status}
            {username}
            <Button type="submit" variant="danger" onClick={() => logout()}>
   Logout
</Button>
        </div>
    )
}

export default UserPage; 