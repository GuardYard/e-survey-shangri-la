import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@mui/icons-material/Edit";
import {DeleteForever} from "@mui/icons-material";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import {deleteAnswerById, updateAnswerTitle} from "../../helpers/answerHelper";

const EditAnswer = (props) => {
    const answer = props.answer;
    const [modalTitleOpen, setModalTitleOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [newAnswerTitle, setNewAnswerTitle] = useState('');

    const handleSubmitTitle = () => {
        if(newAnswerTitle !== "" && newAnswerTitle.length < 100){
            updateAnswerTitle(answer._id, newAnswerTitle).then(res => {
                setModalTitleOpen(false);
                document.location.href = "/";
            })
        }else if(newAnswerTitle === ""){
            alert("Your new answer title is empty !");
        }else if(newAnswerTitle.length > 100){
            alert("Your answer should be under 100 characters");
        }else{
            alert("Please fill the field properly !");
        }
    }

    const handleDeleteAnswer = () => {
        deleteAnswerById(answer._id).then(res => {
            setModalDelete(false);
            setModalTitleOpen(false);
            document.location.href = "/";
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            style={{width:'100%'}}
        >
            {answer.optionNumber + ":" + answer.answerBody}
            <Button variant="contained"
                    key={0}
                    size="small"
                    disableElevation={true}
                    onClick={() => setModalTitleOpen(true)}
            >
                <EditIcon/>
            </Button>
                <Modal
                    open={modalTitleOpen}
                    onClose={() => setModalTitleOpen(false)}
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
                                    name="answer"
                                    variant="outlined"
                                    required
                                    onChange={event => setNewAnswerTitle(event.target.value)}
                                    fullWidth
                                    defaultValue={answer.answerBody}
                                    id="answer"
                                    label="Answer title"
                                />
                            </Grid>
                            <br/>
                            <Button variant="outlined" onClick={handleSubmitTitle}>
                                Submit
                            </Button>
                        </Grid>
                    </Box>
                </Modal>
            <Button variant="outlined"
                    key={1}
                    size="small"
                    color="secondary"
                    onClick={() => setModalDelete(true)}
            >
                <DeleteForever />
            </Button>
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
                            Are you sure you want to delete this option?
                        </Grid>
                        <br/>
                        <Button color="primary" variant="outlined" onClick={handleDeleteAnswer}>
                            Yes
                        </Button>
                        <Button color="secondary" variant="outlined" onClick={() => setModalDelete(false)}>
                            No
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    )
}

export default EditAnswer;