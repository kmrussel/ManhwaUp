import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ManhwaList from '../components/ManhwaList';


function ResultsPage({setManhwaToShow}){
    const filter = useParams();
    const genre = JSON.parse(Object.values(filter))
    const genreStr = []
    for (const element of genre){
        genreStr.push(element)
    }

    const [manhwas, setManhwas] = useState([]);
        const history = useHistory(); 
    
        const loadManhwas = async () => {
            const params = {"genres": genreStr};
            const options = {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch('/manhwas/filter', options)
            const data = await response.json()
            setManhwas(data);
        };
    
        const manhwaShown = manhwa => {
            setManhwaToShow(manhwa);
            history.push(`/manhwa/${manhwa.title}`);
        }
    
        useEffect(() => {
            loadManhwas()
        }, [])
    
        
    return(
        <>
        <p>Results</p>


        <ManhwaList manhwas={manhwas} manhwaShown = {manhwaShown}></ManhwaList>
        </>

    )
}

export default ResultsPage;