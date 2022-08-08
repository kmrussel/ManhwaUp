import React, { useEffect, useState } from 'react'

const Image = ({ url, height, width }) => {
    const [image, setImage] = useState();

    // fetch image from microservice
    useEffect(() => {
        
        if (url) {
            const getData = async (url) => {
                const response = await fetch('/get-data', {
                    method: 'POST',
                    body: JSON.stringify({ url }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                setImage(data.image);
            }
            getData(url);
        }


    }, [url])

    return (

        <img src={`${image}`} height={height} width={width} ></img>

    )
}

export default Image; 