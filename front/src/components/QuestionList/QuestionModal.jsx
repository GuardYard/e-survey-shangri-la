import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {userAnswer} from "../../helpers/userAnswer";
import {getUserById} from "../../helpers/userHelpers";
import {getAllQuestions} from "../../helpers/questionHelper";

const QuestionModal = (props) => {
    const question = props.question;
    const answers = props.answers;
    const currentUserId = props.currentUserId;
    const [modalOpen, setModalOpen] = useState(false)
    const [valueAnswer, setValueAnswer] = React.useState('');

    const handleSubmit = () => {
        userAnswer(currentUserId, question, valueAnswer).then(async res => {
            setModalOpen(false);
            document.location.href = "/";
        })
    }
    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            wrap="nowrap"
            key={question._id}
            style={{height: '25%', width: '80%'}}>
            <Button variant="text"
                    key={0}
                    size="large"
                    disableElevation={true}
                    fullWidth
                    onClick={() => {
                        let checker = true;
                        answers.map(answer => {
                            if(answer.questionId === question._id || question.answerOptions.length === 0){
                                checker = false;
                            }
                        })
                        if(!checker){
                            alert("You already respond to that question or that question doesn't have any options !");
                        }
                        setModalOpen(checker);
                    }}
            >
                {question.question}
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
                    width: 700,
                    height: 400,
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
                            {question.question}
                        </Grid>
                        <Grid container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              style={{width:"100%", height:"70%"}}
                              xs={10}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="gender"
                                    name="controlled-radio-buttons-group"
                                    value={valueAnswer}
                                    onChange={event => setValueAnswer(event.target.value)}
                                    style={{overflow: 'auto'}}
                                >
                                    {question.answerOptions.map(answer =>(
                                        <FormControlLabel key={answer._id} value={answer.optionNumber.toString()} control={<Radio />} label={answer.optionNumber + " : " + answer.answerBody} />
                                    ))
                                    }
                                </RadioGroup>
                                <br/>
                                <Button variant="outlined" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid>
    )
}
export default QuestionModal;