import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';


//https://github.com/gitdagray/react_register_form/blob/main/src/Register.js
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


function Register() {

    const errRef = useRef();

    const [username, setUser] = useState();
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState();
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState();
    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState();
    const [validMatch, setValidMatch] = useState(false);

    const [errorMessage, setErrorMessage] = useState();
    const [success, setSuccess] = useState(false);


    // confirm user
    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidName(result);
        console.log(validName)
    }, [username])

    // confirm email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);

        setValidEmail(result);
    }, [email]);

    // confirm password 
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);

        // compare password with match password 
        if (password === matchPassword) {
            setValidMatch(password);
        }

    }, [password, matchPassword]);

    // error message
    useEffect(() => {
        setErrorMessage('');
    }, [email, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validEmail && validPassword && validMatch && validName) {
            const newUser = { username, email, password }
            const response = await fetch('/register', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            if (response.status === 201) {
                setSuccess(true)
            }
            else if (response.status === 409) {
                setErrorMessage('This email already has an account')
                errRef.current.focus();
            } else {
                setErrorMessage('Registration Failed');
                errRef.current.focus();
            }
        } else {

            setErrorMessage('Unable to register account. Please enter valid information.')
            errRef.current.focus();

        }


    }


    return (
        <>
            {(success ? <section>
                Success!<Link to="/login">Sign In</Link>
            </section> : <>
                <section>
                    {/* error message */}
                    <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>
                    <h1>Register</h1>
                    <form>
                        <label htmlFor="username">
                            Username
                            {username ?
                                validName ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />
                                : ''}
                        </label>
                        <input
                            type="text"
                            id="username"  
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                        <div className="tooltip">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="tooltiptext">
                                Username must be 4 to 24 characters and begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </span>
                        </div>

                        <br />

                        <label htmlFor="email">
                            Email
                            {email ? validEmail ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} /> : ''}
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <br />

                        <label htmlFor="password">
                            Password
                            {password ? validPassword ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} /> : ''}
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <div className="tooltip">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="tooltiptext">
                                Password must be 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.<br />
                            </span>
                        </div>

                        <br />

                        <label htmlFor="confirm_password">
                            Confirm Password
                            {matchPassword ? validMatch ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} /> : ''}
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            required
                        />

                        <br />

                        <button onClick={handleSubmit}>Sign Up</button>
                    </form>
                    Already have an account?
                    <br />
                    <Link to="/login">Sign In</Link>
                </section>

            </>
            )}
        </>
    )
}

export default Register