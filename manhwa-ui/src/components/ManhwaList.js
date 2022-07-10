import React from 'react';
import Manhwa from './Manhwa';
import  { Col, Container, Row } from 'react-bootstrap';

function ManhwaList({ manhwas, manhwaShown }) {
    return (
        <div>
            <Row sm={6} md={4} className='mt-3'>
            {manhwas.map((manhwa, i) => <Manhwa manhwa={manhwa}
            manhwaShown = {manhwaShown}
            key={i} />)}
            </Row>

        </div>

    );
}

export default ManhwaList;
