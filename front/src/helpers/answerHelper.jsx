import axios from "axios";

const ANSWER_API_BASE_URL = "http://localhost:5000/answer/"

export const createNewAnswer = (optionNumber, answerBody, questionId, homeAddress, sni, password) => {
    return axios.post(ANSWER_API_BASE_URL, { optionNumber: optionNumber, answerBody: answerBody, questionId: questionId });
}

export const updateAnswerTitle = (AnswerId, AnswerTitle) => {
    return axios.put(ANSWER_API_BASE_URL + "titleUpdate", {id: AnswerId, newTitle: AnswerTitle});
}

export const deleteAnswerById = (userId) => {
    return axios.delete(ANSWER_API_BASE_URL + userId);
}