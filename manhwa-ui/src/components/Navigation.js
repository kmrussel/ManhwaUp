import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../manhwaImages/Logo1.png';

function Navigation () {
    return(
        <nav class="menu">
            <Link to = "/" exact> <img src={Logo}/> </Link>
            <Link to = "/" exact> Home </Link> 
            <Link to ="/browse-all"> Browse </Link>
        </nav>
    );

};

export default Navigation; 
