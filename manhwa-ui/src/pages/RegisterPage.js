import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';


//https://github.com/gitdagray/react_register_form/blob/main/src/Register.js
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


function Register () {
    const userRef = useRef(); 
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
  
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // confirm user
    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidName(username);
    }, [username])

    // confirm email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    // confirm password 
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);

        // compare password with match password 
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword]);

    // error message
    useEffect(() => {
        setErrorMessage('');
    }, [email, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // handle cases: password not match, password not correct, username short
        // think this has to be if then, not try catch bc its not catching 409 statement 
        try{
            const newUser = {username, email, password}
            const response = await fetch('/register', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json()
            setSuccess(true)
        } catch (error) {
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error.response?.status === 409){
                setErrorMessage('This email already has an account')
            }  else {
                setErrorMessage('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
                Insert Link for Sign In 
            </p>
        </section>
    ) : (
    <section>
        {/* error message */}
        <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>
        <h1>Register</h1>
        <form>
            <label htmlFor="username">
                Username
            </label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
            />
            <div className="tooltip">
                <FontAwesomeIcon icon={faInfoCircle}/>
                <span className="tooltiptext">
                    Username must be 4 to 24 characters and begin with a letter. <br/>
                    Letters, numbers, underscores, hyphens allowed. 
                </span>
            </div>

            <br/>
            
            <label htmlFor="email">
                Email
            </label>
            <input 
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <br/>

            <label htmlFor="password">
                Password
            </label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <div className="tooltip">
                <FontAwesomeIcon icon={faInfoCircle}/>
                <span className="tooltiptext">
                    Password must be 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.<br/>
                </span>
            </div>
            
            <br/>

            <label htmlFor="confirm_password">
                Confirm Password
            </label>
            <input
                type="password"
                id="confirm_password"
                onChange={(e) => setMatchPassword(e.target.value)}
                required
            />

            <br/>

            <button onClick={handleSubmit}>Sign Up</button>
        </form> 
        Already have an account? 
        <br/>
        <Link to="/login">Sign Up</Link>
    </section>
    )}
    </>
  )
}

export default Register