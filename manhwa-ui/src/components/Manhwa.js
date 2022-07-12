import React from 'react';
import  { ListGroup, ListGroupItem} from 'react-bootstrap';
import { Card, CardGroup, Col, Row } from 'react-bootstrap';

function Manhwa({ manhwa, manhwaShown }) {
    
    return (
        <div>
            < div onClick = { () => manhwaShown(manhwa)}>      
                        <p><img src= {require( `../manhwaImages/${manhwa.image}`).default} height={250} width={150} ></img></p> 
                        {manhwa.title}
                    </div>
            
        </div>


                    

             
                    
                       
    
        
        

    );
}

export default Manhwa;