import React from 'react';
import  { Col, Container, Row } from 'react-bootstrap';

function Manhwa({ manhwa, manhwaShown }) {
    
    return (
        <Col>
        < div onClick = { () => manhwaShown(manhwa)}>
            <p><img src= {require( `../manhwaImages/${manhwa.image}`).default} height={250} width={150} ></img></p>
            {manhwa.title}
        </div>
        </Col>
        

    );
}

export default Manhwa;