import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


function LoginPage({ setUserStatus }) {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
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

        // attempt login 
        const user = { "email": `${email}`, "password": `${password}` };
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(user),

            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json();
            const username = data.username;
            const accessToken = data.accessToken;
            setUserStatus('LoggedIn')
            setAuth({ username, email, password, accessToken })

            // clear password and email states
            setPassword('');
            setEmail('');
            navigate(from, { replace: true });
        } else if (response.status === 400) {
            setErrorMessage('Missing email or password');
            errRef.current.focus();
        } else if (response.status === 401) {
            setErrorMessage(`Email and/or password is incorrect. Please try again`);
            errRef.current.focus();
        } else {
            setErrorMessage('Login Failed');
            errRef.current.focus();
        }

    }

    return (
        <section className="user-info">
            <h1>Sign In</h1>
            <form className="user-enter">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="login-input"
                    required
                />

                <br />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="login-input"
                    required
                />
                <br></br>
                <button onClick={handleSubmit}>Sign In</button>
            </form>
            {/* error message */}
            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>

            <section className="info-bottom">
                Dont have an account?
                <br/>
                <Link to="/register">Sign Up</Link>
            </section>

        </section>
    )
}

export default LoginPage