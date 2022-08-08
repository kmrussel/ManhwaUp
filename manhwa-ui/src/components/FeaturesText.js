import React from 'react';
import { Link } from 'react-router-dom';

function FeaturesText() {
    return (

        <ul>
            <li><Link to="/browse-all">Browse All:</Link> Search for a manhwa to read</li>
            <li>Select by genre below or filter manhwa on the browse all page</li>
            <li>Look for a specific manhwa title using the search bar</li>
            <li>Create an account and add a manhwa to your reading list</li>
            <li>Need help or want more information? Visit our <Link to="/information">info page</Link></li>
        </ul>

    )
}

export default FeaturesText; 