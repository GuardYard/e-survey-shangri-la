import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {getUserById} from "../../helpers/userHelpers";
import Loading from "../404/Loading";
import {getAllQuestions} from "../../helpers/questionHelper";
import QuestionModal from "./QuestionModal";

const QuestionList = () => {
    const currentUserId = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if(currentUserId){
            getUserById(currentUserId).then(async res => {
                setAnswers(res.data.answers);
                await getAllQuestions().then(async res => {
                    setQuestions(res.data)
                })
            })
            setIsLoading(false);
        }
    }, [])

    return (
        <div style={{height: '100%', width: '100%'}}>
            {isLoading ?
                (<Loading />)
                :
                (<Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{height: '95%', color: '#343a40', overflow: 'auto'}}>
                    {questions.map(question =>(
                        <QuestionModal question={question} currentUserId={currentUserId} answers={answers}/>
                    ))}

                </Grid>)
            }
        </div>

    )
}

export default QuestionList;