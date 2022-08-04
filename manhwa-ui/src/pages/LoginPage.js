import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Cookies from 'cookies';

function LoginPage () {
    const { setAuth } = useAuth();

    const history = useHistory(); 
    const location = useLocation(); 
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef(); 

    const [email, setEmail] = useState();
    const [password, setPassword] = useState(); 
    const [errorMessage, setErrorMessage] = useState(false);

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
            history.push('/')
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
    <section>
        {/* error message */}
        <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>
        <h1>Sign In</h1>
        <form>
            <label for="email">Email</label>
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
            
            <label for="password">Password</label>
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
    )
}

export default LoginPage