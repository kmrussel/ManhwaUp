import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo1.png';
import Search from './Search'

function Navigation () {
    return(
        <nav class="menu">
            <Link to = "/" exact> <img src={Logo}/> </Link>
            <Link to = "/" exact> Home </Link> 
            <Link to ="/browse-all"> Browse </Link>
            <Search/>
        </nav>
    );

};

export default Navigation; 
