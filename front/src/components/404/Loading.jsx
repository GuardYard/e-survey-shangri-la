import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const Loading = () => {

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height: '100%', width: '100%'}}>
            <CircularProgress size="150px" />
        </Grid>
    )
}

export default Loading;