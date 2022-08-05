import React, { useState, useEffect } from 'react'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Image from './Image';

const ReadingList = ({ manhwaID , manhwaShown}) => {
    const [manhwa, setManhwa] = useState();
    
    // const getManhwa = async () => {
    //     const params = { _id: `${manhwaID}` }
    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify(params),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };
    //     const response = await fetch('/one-manhwa', options)
    //     const data = await response.json()
    //     console.log(data)
    //     setManhwa(data)
       
        
    // }

    console.log(manhwa)


    
        return (
        
            <div>
               
                <Grid item xs={2}>
                    < div onClick={() => manhwaShown(manhwa)}>
                        <Card className="MuiElevatedCard--01">
    
                            <CardContent className={"MuiCardContent-root"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <Grid container justifyContent="space-evenly">
                                            <Image url={manhwa.url} />
                                        </Grid>
                                    </Grid>
                                    <Divider light />
                                </Grid>
    
                            </CardContent>
                            <CardHeader
                                className={"MuiCardHeader-root"}
                                title={manhwa.title}
                                classes={{
                                    title: "MuiCardHeader-title",
                                    subheader: "MuiCardHeader-subheader"
                                }}
                            ></CardHeader>
                        </Card>
                    </div>
                </Grid>
            </div>
        )



}

export default ReadingList