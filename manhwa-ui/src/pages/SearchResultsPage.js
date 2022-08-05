import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ManhwaList from '../components/ManhwaList';

function SearchResultsPage ({setManhwaToShow}) {
    const [manhwas, setManhwas] = useState([]);
    const navigate = useNavigate(); 

    const {search} = useParams(); 
    const searchManhwas = async () => {
        const params = {"title" : `${search}`};
        const options = {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch ('/search', options)
        const data = await response.json()
        setManhwas(data);
    }

    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        navigate(`/manhwa/${manhwa}`)
    }

    useEffect(() => {
        searchManhwas()
    }, [search])

    return(
        
        <>
        <p>Results for {search}</p>
        <i>Not what you wanted?</i>
        <Link to= {`/browse-all`}>Go back to browse all</Link>
        <ManhwaList manhwas={manhwas} manhwaShown = {manhwaShown} ></ManhwaList>
        </>
    )
}

export default SearchResultsPage; 