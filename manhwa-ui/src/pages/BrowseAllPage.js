import React from 'react';
import ManhwaList from '../components/ManhwaList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetGenre from '../components/GetGenre';
import Filter from '../components/Filter'
import useCollapse from 'react-collapsed';


function BrowseAllPage({ setManhwaToShow, setGenreToShow }) {
    const [manhwas, setManhwas] = useState([]);
    const navigate = useNavigate();
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const loadManhwas = async () => {
        const response = await fetch('/manhwas');
        const data = await response.json();
        setManhwas(data);
    };

    const manhwaShown = manhwa => {
        setManhwaToShow(manhwa);
        navigate(`/manhwa/${manhwa}`);
    }

    useEffect(() => {
        loadManhwas();
    }, [])

    // get manhwas based on genres picked
    function getFilter() {

        let checkboxes = document.querySelectorAll('input[name="genre"]:checked');
        let filter = [];
        checkboxes.forEach((checkbox) => {
            filter.push(checkbox.value);
        });
        const genresFilter = JSON.stringify(filter);
        let text = `You chose to find the following genres: ${genresFilter}`
        if (window.confirm(text) === true) {
            goFilter(genresFilter)
        }
    }

    function goFilter(genresFilter) {
        navigate(`/results/${genresFilter}`)
    };

    return (
        <body>
            <h2>Explore All</h2>
            <div>
                <div className="tooltip">about advanced filter
                    <span className="tooltiptext">
                        advanced filter allows you to search for manhwa by genres
                    </span>
                </div>
                <br>
                </br>
                <button {...getToggleProps()}>
                    {isExpanded ? 'See Less' : 'Advanced Filter'}
                </button>

                <section {...getCollapseProps()}>
                    <br></br>
                    <div className="tooltip">how to use
                        <span className="tooltiptext">
                            select genre(s) that you wish to view and press go.
                            If multiple genres are selected, only manhwas containing
                            all the selected genres are shown.
                        </span>
                    </div>
                    <form >
                        <fieldset className="filter">
                            <legend>Filter by genre</legend>
                            <section>
                            <GetGenre setGenreToShow={setGenreToShow} setManhwaToShow={setManhwaToShow} Component={Filter}></GetGenre>
                            </section>
                            
                        </fieldset>
                        <button id="btn" type="submit" onClick={getFilter}
                        >Go</button>

                    </form></section>
            </div>




            <ManhwaList manhwas={manhwas} manhwaShown={manhwaShown}></ManhwaList>

        </body>
    );
}

export default BrowseAllPage;