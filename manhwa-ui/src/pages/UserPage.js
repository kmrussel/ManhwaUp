import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import User from '../components/User';

function UserPage({ setManhwaToShow, userStatus }) {
  const [user, setUser] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadUser = async () => {
      try {
        const response = await axiosPrivate.post('/user',
          JSON.stringify({ "email": auth.email }),
          { signal: controller.signal }
        )
        isMounted = false
        setUser(response.data)
      } catch (error) {
        console.log(error)
      };
    };

    loadUser();

    return () => {

      isMounted = false;
      controller.abort();
    }

  }, []);


  return (
    <article>
      {
        user ?
          <User user={user} setManhwaToShow={setManhwaToShow} userStatus={userStatus} />
          : <p></p>
      }

    </article>
  )


}

export default UserPage