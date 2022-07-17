import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';


export const RegisterPage = ({setLogInStatus, setUser}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const addUser = async () => {
        const newUser = {username, email, password}
        const options = {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch('/register', options)
        const data = await response.json()
        
        if (response.status === 201) {
            alert("Successfully registered. Welcome to ManhwaUp!")
            setLogInStatus("Logged_In")
            setUser(data)
            history.push("/userPage")
        } else {
            alert("Failed to register, please try again.")
            history.push("/register")
        }
    };

    return(
        <div>
            <h1>Register</h1>
        <form>
         <div>
            <label for="name">Name</label>
            <input
            type="text" 
            placeholder="enter username here"
            id="name" 
            name="name"
            value={username} 
            required
            onChange = {e => setUsername(e.target.value)}/>
        </div>   
        <div>
            <label for="email">Email</label>
            <input 
            type="email" 
            placeholder="xyz@gmail.com"
            id="email" 
            name="email" 
            value={email}
            required
            onChange = {e => setEmail(e.target.value)}/>
        </div>   
        <div>
            <label for="password">Password</label>
            <input
             type="password" 
             placeholder="******"
             id="password" 
             name="password" 
             value={password}
             required
             onChange = {e => setPassword(e.target.value)}/>
        </div>   
        
        <button type="button" onClick={addUser}>Register</button>
        
        </form>
        <Link to="/login">Login</Link>
        </div>
    
    )

}

export default RegisterPage;