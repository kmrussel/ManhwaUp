import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import User from '../components/User';

function UserPage({ setManhwaToShow }) {
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
      }
    }

    loadUser()

    return () => {

      isMounted = false;
      controller.abort();
    }

  }, [])

  if (user) {
    return (
      <article>
        <h2>User page</h2>
        <User user={user} setManhwaToShow={setManhwaToShow} />

      </article>
    )
  } else {
    return (
      <div>
      </div>
    )
  }

}

export default UserPage