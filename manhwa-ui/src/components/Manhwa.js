import React from 'react';

function Manhwa({ manhwa, manhwaShown }) {
    return (
        < div onClick = { () => manhwaShown(manhwa)}>
            {manhwa.title}
        </div>

        

    );
}

export default Manhwa;