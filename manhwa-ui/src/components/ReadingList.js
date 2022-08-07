import React, { useState, useEffect } from 'react'
import ReadingListButton from './ReadingListButton'
import Image from './Image'

const ReadingList = ({ manhwaID, manhwaShown , index, userStatus}) => {
    const [manhwa, setManhwa] = useState();
    index = index + 1
    useEffect(() => {

        const getManhwa = async () => {
            const params = { _id: `${manhwaID}` }
            const options = {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch('/one-manhwa', options)
            const data = await response.json()
            setManhwa(data)
        }

        getManhwa();
        
    }, [])
    
    return (
        <>
            {manhwa ?
                <tr>
                    <td>{index}</td>
                    <td><Image url={manhwa.url} height={100} width={70} /></td>
                    <td>{manhwa.title}</td>
                    <td><ReadingListButton userStatus={userStatus} id={manhwa._id} buttonmsg={'Undo'} /></td>
                </tr>
                
                : <p></p>

            }
        </>
    )


}

export default ReadingList