import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function UserPage () {
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth(); 

    useEffect(() => {
      let isMounted = true; 
      const controller = new AbortController();
      
      const loadUser = async () => {
        let isMounted = true; 
        const controller = new AbortController();

        try{
          await axiosPrivate.post('/user',
          JSON.stringify({"email": auth.email}),
          {signal: controller.signal}
          ).then((response) => {
            setUser(response.data[0])
            
          })
          console.log(user)
        } catch (error){
          console.log(error)
        }
      }

        loadUser();

        return() => {
          isMounted = false;
          controller.abort(); 
        }
      
    }, [])

  return (
    <article>
        <h2>User page</h2>
        {user.username}
    </article>
  )
}

export default UserPage