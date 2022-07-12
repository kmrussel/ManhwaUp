import React from 'react';
import {Link} from 'react-router-dom';

function FeaturesText () {
    return ( 
        <ul>
            <li>Click on a manhwa to view it</li>
            <li><Link to="/browse-all">Browse All:</Link> Search for a manhwa to read</li>
            <li>Filter feature: Select by genre below or filter manhwa on the browse all page</li>
            <li>Search: Search for a manhwa title</li>
            <li>Need help or want more information? Vist our <Link to="/information">info page</Link></li>
        </ul>
    )
}

export default FeaturesText; 