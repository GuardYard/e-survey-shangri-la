import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import PageNotFound from "../404/PageNotFound";
import Button from "@material-ui/core/Button";

const PageContainer = (props) => {
    const currentUserId = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;

    const logout = () => {
        localStorage.removeItem("id")
        document.location.href = "/";
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            style={{height: '90%', backgroundColor: 'white', padding: '2em', width: "40%"}}>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center">
                <Button onClick={logout} variant="contained" size="medium">
                    LOG OUT
                </Button>
            </Grid>
            {currentUserId ?
                props.children
            :
                <PageNotFound />
            }
        </Grid>
    )
}

export default PageContainer;