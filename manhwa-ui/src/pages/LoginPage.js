import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';

function LoginPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    const history = useHistory();
    const cookies = new Cookies(); 

    const logUserIn = async () => {
        const user = {"email": `${email}`, "password": `${password}`};
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(response.status === 201) {
            setLogin(true)
            alert("You have logged in!")
            cookies.set("TOKEN", response.formData.token, {
                path:"/"
            })
            history.push("/userPage")
        } else {
            alert(`Email and/or password is incorrect. Please try again`)
            history.push('/login')
        }
        
    }

    return(
        <div>
            <h1>Login</h1>
        <form>

        <div>
            <label for="email">Email</label>
            <input
             type="email" 
             id="email" 
             name="email"
             value= {email}
             onChange = {(e) => setEmail (e.target.value)}
             placeholder="Enter email"
             required
             />
        </div>   
        <div>
            <label for="password">Password</label>
            <input
             type="password" 
             id="password" 
             name="password"
             value={password}
             onChange = {(e) => setPassword(e.target.value)}
             placeholder="Password" 
             required/>
        </div>   
        <button type="button" onClick = {logUserIn}>Login</button>
        
        </form>
        <i>Not a member?</i>
        <Link to="/register">Register Here</Link>
        </div>
    
    )

}

export default LoginPage; 