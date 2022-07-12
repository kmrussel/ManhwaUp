import React from 'react';
import { Link } from 'react-router-dom';
function InformationPage() {
    
    return (
        <>
        <h2>General Information</h2>

        <h5>Frequently asked questions</h5>
        <ul id="faq">
            <li><a href="#info-about">What is ManhwaUp?</a></li>
            <li><a href="#info-manhwas">What are manhwas?</a></li>
            <li><a href="#info-manhwas">How do I read manhwas?</a></li>
            <li><a href="#info-manhwagas">Why are there multiple authors on a manhwa?</a></li>
            <li><a href="#info-browse">Where should I start browsing?</a></li>
            <li><a href="#info-about">How can I look for a specifc manhwa?</a></li>
            <li><a href="info-filter-q">How do I look for manhwas with <q><i>xyz</i></q>genre?</a></li>

        </ul>
        <div>
            <h4 id="info-about">About ManhwaUp</h4>
            <p>ManhaUp is a website created to freely browse all your favorite manhwa. Either <Link to="/browse-all">browse all</Link> or search for manhwas by title using the search bar at the top
            or by genre using the filter option in the browse all page. Click on a manhwa to view its summary and various other information. </p>

        </div>
        <div>
            <h4 id="info-manhwas">Manhwas</h4>
            <p>Manhwa (만화) is the general Korean term for comics and print cartoons. 
            Outside Korea, the term usually refers to South Korean comics. Manhwa is a notable part of South Korean culture but has extended its reach to many other countries.
            Manhwas are often published online in a long vertical scrolling format and are meant to be read veritcally from right to left, top to bottom on a mobile device. 
            <br></br>
            <a href="https://en.wikipedia.org/wiki/Manhwa">visit to learn more about manhwas</a> </p>
        </div>
        <div>
            <h4 id="info-manhwagas">Manhwagas</h4>
            <p>Manhwagas (만화가) are authors of manhwa. Often times there are multiple authors credited since there may be different manhwagas working the manhwa's illustration and story.</p>
        </div>
        <div>
            <h4 id="info-browse">Browse All</h4>
            <p>The browse all shows you all manhwas. You can further filter manhwas by genre
            by clicking the advanced filter option and select the genres that interest you. </p>
        </div>
        <div>
            <h4 id="info-filter-q">Advanced Filter Option</h4>
            <p>Advanced filter allows you to search for manhwa by genres. Select the genre(s) that you wish to view and press go. 
            If multiple genres are selected, only manhwas containing all the selected genres are shown.</p>
        </div>
        </>
    )
}

export default InformationPage; 