import axios from "axios";

const QUESTION_API_BASE_URL = "http://localhost:5000/question/"

export const getAllQuestions = () => {
    return axios.get(QUESTION_API_BASE_URL);
}

export const getQuestionStat = (id) => {
    return axios.get(QUESTION_API_BASE_URL + "stat/" + id);
}

export const addQuestions = (question) => {
    return axios.post(QUESTION_API_BASE_URL, { question:question, answerOptions:[], questionSetId: "61e4622f083f857bc4bfa8df"});
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