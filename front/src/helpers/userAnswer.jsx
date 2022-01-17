import axios from "axios";

const USER_ANSWER_API_BASE_URL = "http://localhost:5000/respond/"

export const userAnswer =  (owner, questionId, questionAnswer) => {
    return axios.post(USER_ANSWER_API_BASE_URL, { owner: owner, questionId: questionId, questionAnswer: questionAnswer });
}