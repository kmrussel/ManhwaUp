import React, { useState, useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ReadingListButton = ({ userStatus, id, buttonmsg }) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const msgRef = useRef();

    const [read, setRead] = useState();
    const [message, setMessage] = useState();

    // check if manhwa is already in reading list
    const checkManhwa = async () => {
        await axiosPrivate.post('/check-list',
            JSON.stringify({ email: auth.email, manhwa: id }))
            .then((response) => {
                setRead(response.data);
            });
    };

    const addManhwa = async () => {
        const response = await fetch('/reading-list/add', {
            method: 'POST',
            body: JSON.stringify({ user: auth.email, manhwa: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.status === 201) {
            setMessage('Manhwa successfully added to your list.');
            setRead(data)
        } else if (data?.InList) {

            setMessage('This manhwa is already in your list.');
        } else {
            setMessage('Unable to update your list at this time. Please try again later.');
        }

    };

    const removeManhwa = async () => {
        const response = await fetch('/reading-list/remove', {
            method: 'POST',
            body: JSON.stringify({ user: auth.email, manhwa: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.modifiedCount == 1) {
            setMessage('Manhwa successfully removed from your list.');
            setRead();
        } else if (data.modifiedCount == 0) {
            setMessage('This manhwa is not in your list.');
        } else {
            setMessage('Unable to update your list at this time. Please try again later.');
        }
    };

    // attempt to add manhwa when user is not loagged in 
    const updateAttempt = () => {
        setMessage('You must be logged in to use this function.')
    };

    useEffect(() => {
        if (userStatus === "LoggedIn") {
            checkManhwa();
        }
    }, [])



    return (
        <div>
            {
                userStatus === 'LoggedIn' ?
                    read ? <button onClick={removeManhwa}>Remove from reading list</button> : <button onClick={addManhwa}>{buttonmsg}</button>
                    :
                    <>
                        <button onClick={updateAttempt}>Add to reading list</button>
                    </>

            }
            <p ref={msgRef} className={message ? "message" : "offscreen"}>{message}</p>
        </div>
    )
}

export default ReadingListButton
