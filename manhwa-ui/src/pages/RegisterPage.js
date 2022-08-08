import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

// Citations for REGEX
// Date accessedL 08.07.22
// email regex: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// user and password regex: https://github.com/gitdagray/react_register_form/blob/main/src/Register.js

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
    }, [email, password, matchPassword]);

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
            });

            const data = await response.json()
            if (response.status === 201) {
                setSuccess(true);
            }
            else if (response.status === 409) {
                setErrorMessage('This email already has an account');
                errRef.current.focus();
            } else {
                setErrorMessage('Registration Failed');
                errRef.current.focus();
            }
        } else {

            setErrorMessage('Unable to register account. Please enter valid information.');
            errRef.current.focus();

        }


    }


    return (
        <div>
            {(success ? <section className="user-info">
                <h2>Success!</h2>
                <br></br>
                <Link to="/login">Sign In</Link>
            </section> : <>
                <section className="user-info">
                    {/* error message */}
                    <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>

                    <h1>Register</h1>
                    <form className="user-enter">
                        <div>
                            <label htmlFor="username">
                                Username
                                {username ?
                                        validName ? <FontAwesomeIcon icon={faCheck} className="check"/> : <FontAwesomeIcon icon={faTimes} className="x-mark"/>
                                    : ''}
                            </label>
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                            <section className="register-requirements">
                                Username must be 4 to 24 characters and begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </section>
                        </div>



                        <div className="user-input">
                            <label htmlFor="email">
                                Email
                                {email ? validEmail ? <FontAwesomeIcon icon={faCheck} className="check"/> : <FontAwesomeIcon icon={faTimes} className="x-mark"/> : ''}
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="register-input">
                            <label htmlFor="password">
                                Password
                                {password ? validPassword ? <FontAwesomeIcon icon={faCheck} className="check"/> : <FontAwesomeIcon icon={faTimes} className="x-mark"/> : ''}
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <section className="register-requirements">
                                Password must be 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.
                            </section>
                        </div>




                        <div>
                            <label htmlFor="confirm_password">
                                Confirm Password
                                {matchPassword ? validMatch ? <FontAwesomeIcon icon={faCheck} className="check"/> : <FontAwesomeIcon icon={faTimes} className="x-mark"/> : ''}
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                required
                            />
                        </div>


                        <button onClick={handleSubmit}>Sign Up</button>
                        <br></br>
                    </form>
                    <section className="info-bottom">
                        Already have an account?
                        <br />
                        <Link to="/login">Sign In</Link>
                    </section>


                </section>

            </>
            )}
        </div>
    )
}

export default Register