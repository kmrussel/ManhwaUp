import React, { useEffect, useState } from 'react'

const Description = ({ url }) => {

    const [description, setDescription] = useState();

    useEffect(() => {
        if (url) {
            const getData = async (url) => {
                const response = await fetch('/get-data', {
                    method: 'POST',
                    body: JSON.stringify({ url }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                console.log(data.summary)
                const summary = data.summary
                setDescription(summary.split('ⓒ', 1)[0])
            }
            getData(url);
        }
    }, [])

    return (
        <p>{description}</p>
    )
}

export default Description; 