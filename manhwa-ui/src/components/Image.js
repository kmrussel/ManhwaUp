import React, {useEffect, useState} from 'react'

const Image = ({ url }) => {

    const [image, setImage] = useState();

    useEffect(() => {
        const getData = async (url) => {
            const response = await fetch('/get-data', {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            setImage(data.image)
            
            
        }
        getData(url)

    }, [url])
    
  return (
    
    <img src= {`${image}`} height={250} width={150} ></img>
    
  )
}

export default Image; 