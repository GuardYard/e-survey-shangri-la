import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {getAllUsers, getUserById} from "../../helpers/userHelpers";
import Loading from "../404/Loading";
import {addQuestions, getAllQuestions, getQuestionStat, updateQuestionTitle} from "../../helpers/questionHelper";
import EditQuestion from "./EditQuestion";
import {Button, Typography} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";

const QuestionListAdmin = () => {
    const currentUserId = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openModalQuestion, setOpenModalQuestion] = useState(false);
    const [questionTitle, setQuestionTitle] = useState('');


    useEffect(() => {
        if(currentUserId) {
            getUserById(currentUserId).then(async res => {
                await getAllQuestions().then(async res => {
                    setQuestions(res.data)
                })
                await getAllUsers().then(async res => {
                    setUsers(res.data)
                })
            })
            setIsLoading(false);
        }
    }, [])

    const handleSubmitQuestion = () => {
        if(questionTitle !== "" && questionTitle.length < 1000 && questionTitle.length > 10){
            addQuestions(questionTitle).then(res => {
                setOpenModalQuestion(false);
                document.location.href = "/";
            })
        }else if(questionTitle === ""){
            alert("Your new question is empty !");
        }else if(questionTitle.length > 1000 || questionTitle < 10){
            alert("Your question should be between 10 and 1000 characters");
        }else{
            alert("Please fill the field properly !");
        }
    }


    return (
        <div style={{height: '100%', width: '100%'}}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{height: '5%', color: '#343a40'}}>
                <Typography>Add Question as admin:</Typography>
                <Button onClick={() => setOpenModalQuestion(true)}>
                    <AddOutlined />
                </Button>
                <Modal
                    open={openModalQuestion}
                    onClose={() => setOpenModalQuestion(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        height: 200,
                        color: "black",
                        backgroundColor: 'whitesmoke',
                        border: '2px solid whitesmoke',
                        boxShadow: 24,
                        p: 4}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            style={{height:"100%", width:"100%"}}
                        >
                            <Grid item
                                  style={{width:"50", fontSize:"20px"}}
                                  xs={10}>
                                <TextField
                                    name="question"
                                    variant="outlined"
                                    required
                                    onChange={event => setQuestionTitle(event.target.value)}
                                    fullWidth
                                    id="question"
                                    label="Question title"
                                />
                            </Grid>
                            <br/>
                            <Button variant="outlined" onClick={handleSubmitQuestion}>
                                Submit
                            </Button>
                                When you submit, your question is going to be created with no options and until you edit it to add options, users won't be able to access it.
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
            {isLoading ?
                (<Loading />)
                :
                (<Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    style={{height: '85%', color: '#343a40', overflow: 'auto'}}>
                    {questions.map(question =>(
                        <EditQuestion key={question._id}  users={users} question={question}/>
                    ))}
                </Grid>)
            }
        </div>

    )
}

export default QuestionListAdmin;