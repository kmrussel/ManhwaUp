import React from 'react';
import Manhwa from './Manhwa';

function ManhwaList({ manhwas, manhwaShown }) {
    return (
        <div>
            {manhwas.map((manhwa, i) => <Manhwa manhwa={manhwa}
            manhwaShown = {manhwaShown}
            key={i} />)}
        </div>

    );
}

export default ManhwaList;
