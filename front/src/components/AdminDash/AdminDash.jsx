import React from "react";
import PageContainer from "../PageContainers/PageContainer";
import QuestionList from "../QuestionList/QuestionList";
import Grid from "@material-ui/core/Grid";
import QuestionListAdmin from "../QuestionList/QuestionListAdmin";

const AdminDash = () => {

    return (
        <PageContainer>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                style={{height: '90%', color: '#343a40'}}>
                <h2>Questions : </h2>
                <QuestionListAdmin />
            </Grid>
        </PageContainer>
    )
}

export default AdminDash;