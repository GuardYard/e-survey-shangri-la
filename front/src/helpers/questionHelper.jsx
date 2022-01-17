import axios from "axios";

const QUESTION_API_BASE_URL = "http://localhost:5000/question/"

export const getAllQuestions = () => {
    return axios.get(QUESTION_API_BASE_URL);
}

export const getQuestionsById = (questionId) => {
    return axios.get(QUESTION_API_BASE_URL + questionId);
}

export const updateQuestionTitle = (Qid, questionTitle) => {
    return axios.put(QUESTION_API_BASE_URL + "titleUpdate", {id: Qid, newTitle: questionTitle});
}

export const deleteQuestionById = (userId) => {
    return axios.delete(QUESTION_API_BASE_URL + userId);
}