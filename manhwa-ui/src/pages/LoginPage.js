import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

function LoginPage () {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef(); 

    const [email, setEmail] = useState();
    const [password, setPassword] = useState(); 
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const user = {"email": `${email}`, "password": `${password}`};
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(response.status === 201) {
            const data = await response.json()

            const accessToken = data.accessToken;
            setAuth({ email, password, accessToken })
            // clear password and email 
            setPassword('');
            setEmail('');
            setSuccess(true)
        } else if (response.status === 400) {
            setErrorMessage('Missing email or password');
            errRef.current.focus();
        } else if (response.status === 401) {
            setErrorMessage(`Email and/or password is incorrect. Please try again`)
            errRef.current.focus();
        } else {
            setErrorMessage('Login Failed')
            errRef.current.focus();
        }
    }

    return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br/>

                <p> 
                    <Link to="/">Go to Home</Link>
                </p>
            </section>
        ) : (
    <section>
        {/* error message */}
        <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>
        <h1>Sign In</h1>
        <form>
            <label htmlFor="email">Email</label>
            <input 
                type="text" 
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            <br/>
            
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <button onClick = {handleSubmit}>Sign In</button>
        </form>

        Dont have an account?
        <Link to="/register">Sign Up</Link>
    </section>
        )} </>
    )
}

export default LoginPage