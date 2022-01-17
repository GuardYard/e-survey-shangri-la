import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {Typography} from "@mui/material";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@mui/icons-material/Edit";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {AddOutlined, DeleteForever, QueryStatsOutlined} from "@mui/icons-material";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {deleteQuestionById, getQuestionStat, updateQuestionTitle} from "../../helpers/questionHelper";
import EditAnswer from "./EditAnswer";
import {createNewAnswer} from "../../helpers/answerHelper";
import AnswerStat from "./AnswerStat";
import Loading from "../404/Loading";

const EditQuestion = (props) => {
    const question = props.question;
    const users = props.users;
    const [questionStat, setQuestionStat] = useState({});
    const [questionStatTotal, setQuestionStatTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStat, setModalStat] = useState(false);
    const [modalQuestionOpen, setModalQuestionOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAnswerOpen, setModalAnswerOpen] = React.useState(false);
    const [newQuestionTitle, setNewQuestionTitle] = React.useState('');
    const [newAnswerTitle, setNewAnswerTitle] = React.useState('');

    useEffect(() => {
        if(question._id){
            getQuestionStat(question._id).then(async res => {
                await setQuestionStat(res.data);
            })
        }
        setIsLoading(false);
        console.log(questionStat)
    }, [])

    const handleSubmitTitle = () => {
        if(newQuestionTitle !== "" && newQuestionTitle.length < 1000 && newQuestionTitle.length > 10){
            updateQuestionTitle(question._id, newQuestionTitle).then(res => {
                setModalOpen(false);
                document.location.href = "/";
            })
        }else if(newQuestionTitle === ""){
            alert("Your new question is empty !");
        }else if(newQuestionTitle.length > 1000 || newQuestionTitle < 10){
            alert("Your question should be between 10 and 1000 characters");
        }else{
            alert("Please fill the field properly !");
        }
    }

    const handleDeleteQuestion = () => {
        deleteQuestionById(question._id).then(res => {
            document.location.href = "/";
        })
    }
    const handleSubmitNewAnswer = () => {
        const lastIndex = question.answerOptions.length + 1;
        if(newAnswerTitle !== "" && newAnswerTitle.length < 100){
            createNewAnswer(lastIndex, newAnswerTitle, question._id).then(res => {
                setModalAnswerOpen(false);
                document.location.href = "/";
            })
        }else {
            alert("Fill the fields properly (not empty and under 100 characters)");
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            wrap="nowrap"
            key={question._id}
            style={{height: '25%', width: '80%', maxWidth:'850px', minWidth:'400px'}}>
            <Typography style={{width: '80%'}}>
                {question.question}
                <Button variant="text"
                      key={1}
                      size="small"
                      onClick={() => {
                          let checker = true;
                          users.map(user => {
                              user.answers.map(answer =>{
                                  question.answerOptions.map(answerOption =>{
                                      if(answer.questionId === question._id){
                                          checker = false;
                                      }
                                  })
                              })
                          })
                          if(!checker){
                              alert("Someone already answered ot that question, you can't edit it");
                          }
                          setModalOpen(checker)
                      }}>
                    <EditOutlinedIcon />
                </Button>
                <Button
                        key={question._id}
                        size="large"
                        color="primary"
                        onClick={() => {
                            getQuestionStat(question._id).then(async res => {
                                await setQuestionStat(res.data);
                            })
                            setModalStat(true)
                        }}
                >
                    <QueryStatsOutlined />
                </Button>
                {!isLoading && questionStat !== undefined ?
                    <Modal
                    open={modalStat}
                    onClose={() => setModalStat(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: 400,
                        color: "black",
                        backgroundColor: 'whitesmoke',
                        border: '2px solid whitesmoke',
                        boxShadow: 24,
                        p: 4
                    }}>
                        {questionStat.Answers !== undefined ?
                            <Grid
                            container
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center"
                            style={{height: "100%", width: "100%", maxHeight: "20em", overflow: 'auto'}}
                        >
                            <Typography>Answer Stats: {question.question}</Typography>
                            {
                                questionStat.Answers.map(answer => (
                                    <AnswerStat Aid={answer.id} count={answer.count}/>
                                ))
                            }
                            <Button onClick={() => setModalStat(false)}>
                                Close stats
                            </Button>
                        </Grid>
                        :
                        <Loading/>
                        }
                    </Box>
                </Modal>
                : <Loading/>
                }
            </Typography>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                wrap="nowrap"
                key={question._id}
                style={{width: '20%', maxWidth:'250px', minWidth:'150px'}}>
                <Button variant="contained"
                        key={0}
                        size="large"
                        disableElevation={true}
                        style={{fontSize: '10px'}}
                        onClick={() => {
                            let checker = true;
                            users.map(user => {
                                user.answers.map(answer =>{
                                    question.answerOptions.map(answerOption =>{
                                        if(answer.questionId === question._id){
                                            checker = false;
                                        }
                                    })
                                })
                            })
                            if(!checker){
                                alert("Someone already answered ot that question, you can't edit it");
                            }
                            setModalQuestionOpen(checker);
                        }}
                >
                    Answers
                    <EditIcon style={{paddingLeft: '5px'}} />
                </Button>
                <Button variant="outlined"
                        key={1}
                        size="large"
                        disableElevation={true}
                        color="secondary"
                        onClick={() => setModalDelete(true)}
                >
                    <DeleteForever />
                </Button>
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
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
                                    onChange={event => setNewQuestionTitle(event.target.value)}
                                    fullWidth
                                    defaultValue={question.question}
                                    id="question"
                                    label="Question title"
                                />
                            </Grid>
                            <br/>
                            <Button variant="outlined" onClick={handleSubmitTitle}>
                                Submit
                            </Button>
                        </Grid>
                    </Box>
                </Modal>
                <Modal
                    open={modalDelete}
                    onClose={() => setModalDelete(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
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
                                Are you sure you want to delete this question?
                            </Grid>
                            <br/>
                            <Button color="primary" variant="outlined" onClick={handleDeleteQuestion}>
                                Yes
                            </Button>
                            <Button color="secondary" variant="outlined" onClick={() => setModalDelete(false)}>
                                No
                            </Button>
                        </Grid>
                    </Box>
                </Modal>
                <Modal
                    open={modalQuestionOpen}
                    onClose={() => setModalQuestionOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        height: 300,
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
                            style={{height:"100%", width:"100%", maxHeight:"20em", overflow: 'auto'}}
                        >
                            <Typography>Answer Option:</Typography>
                            {question.answerOptions.map(answer => (
                                <EditAnswer key={answer._id} answer={answer}/>
                            ))}
                            <Button color="primary" onClick={() => setModalAnswerOpen(true)}>
                                <AddOutlined />
                            </Button>
                            <Modal
                                open={modalAnswerOpen}
                                onClose={() => setModalAnswerOpen(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 300,
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
                                                name="newAnswer"
                                                variant="outlined"
                                                required
                                                onChange={event => setNewAnswerTitle(event.target.value)}
                                                fullWidth
                                                id="newAnswer"
                                                label="Answer title"
                                            />
                                        </Grid>
                                        <br/>
                                        <Button variant="outlined" onClick={handleSubmitNewAnswer}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Box>
                            </Modal>
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
        </Grid>
    )
}

export default EditQuestion;