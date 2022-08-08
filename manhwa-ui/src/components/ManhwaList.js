import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Image from './Image';

function ManhwaList({ manhwas, manhwaShown }) {

    return (
        <Grid container spacing={3}>
            {manhwas.map((manhwa, i) => (

                <Grid item xs={2} key={i}>
                    < div onClick={() => manhwaShown(manhwa)}>
                        <Card className="MuiElevatedCard--01">

                            <CardContent className={"MuiCardContent-root"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <Grid container alignContent='flex-start' alignItems='flex-start' justify='flex-start' >
                                            <Image url={manhwa.url} height={250} width={175} />

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

            ))}
        </Grid>

    );

}

export default ManhwaList;
