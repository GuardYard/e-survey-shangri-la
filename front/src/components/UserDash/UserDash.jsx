import React from "react";
import PageContainer from "../PageContainers/PageContainer";
import Grid from "@material-ui/core/Grid";
import QuestionList from "../QuestionList/QuestionList";

const UserDash = () => {

    return (
        <PageContainer>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                style={{height: '90%', color: '#343a40'}}>
                <h2>Questions : </h2>
                <QuestionList />
            </Grid>
        </PageContainer>
    )
}

export default UserDash;