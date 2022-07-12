import React from 'react';
import Manhwa from './Manhwa';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import purple from "@material-ui/core/colors/purple";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

function ManhwaList({ manhwas, manhwaShown }) {
    return (
        <Grid container spacing ={3}>
            {manhwas.map(manhwa => (
                <Grid item xs={2}>
                    < div onClick = { () => manhwaShown(manhwa)}> 
                    <Card className="MuiElevatedCard--01">

                        <CardContent className={"MuiCardContent-root"}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <Grid container justify="space-evently">
                                    <img src= {require( `../manhwaImages/${manhwa.image}`).default} height={250} width={150} ></img>
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
// {manhwas.map((manhwa, i) => <Manhwa manhwa={manhwa}
// manhwaShown = {manhwaShown}
// key={i} />)}
export default ManhwaList;
