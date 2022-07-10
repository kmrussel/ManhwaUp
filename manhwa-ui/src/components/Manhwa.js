import React from 'react';


function Manhwa({ manhwa, manhwaShown }) {
    
    return (
        
        < div onClick = { () => manhwaShown(manhwa)}>
            {manhwa.title}
            <img src= {require( `../manhwaImages/${manhwa.image}`).default} height={250} width={150} ></img>
        </div>

        

    );
}

export default Manhwa;