import React, {useEffect} from "react";
import PageContainer from "../PageContainers/PageContainer";
import Grid from "@material-ui/core/Grid";
import {getUserById} from "../../helpers/userHelpers";

const QuestionList = () => {
    const currentUserId = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;


    useEffect(() => {
        if(currentUserId){
            getUserById(currentUserId).then(async res => {
                setUserStatus(res.data.admin)
            })
        }
    }, [])

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{height: '90%', color: '#343a40', overflow: 'auto', border:'1px solid black'}}>
            {
                <div style={{border: '1px solid red', height: '25%', width: '80%'}}>1</div>
            }
            <div style={{border: '1px solid blue', height: '25%', width: '80%'}}>2</div>
            <div style={{border: '1px solid blue', height: '25%', width: '80%'}}>3</div>
            <div style={{border: '1px solid blue', height: '25%', width: '80%'}}>3</div>
            <div style={{border: '1px solid blue', height: '25%', width: '80%'}}>3</div>
        </Grid>
    )
}

export default QuestionList;