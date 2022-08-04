import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

function ManhwaList({ manhwas, manhwaShown }) {
    return (
        <Grid container spacing ={3}>
            {manhwas.map((manhwa, i) => (
                
                <Grid item xs={2} key={i}>
                    < div onClick = { () => manhwaShown(manhwa)}> 
                    <Card className="MuiElevatedCard--01">

                        <CardContent className={"MuiCardContent-root"}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <Grid container justifyContent="space-evenly">
                                    <img src= {`${manhwa.image}`} height={250} width={150} ></img>
                                    </Grid>
                                </Grid>
                                <Divider light/>                            
                                </Grid>
                            
                            
                        </CardContent>
                        <CardHeader
                            className={"MuiCardHeader-root"}
                            title={manhwa.title}
                            classes ={{
                                title: "MuiCardHeader-title",
                                subheader: "MuiCardHeader-subheader"
                            }}
                        ></CardHeader>
                    </Card>
                    </div>
                 </Grid>   
                 
            ))}
        </Grid>
        
    );
  
}

export default ManhwaList;
