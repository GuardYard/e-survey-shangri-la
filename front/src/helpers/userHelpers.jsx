import axios from "axios";

const USER_API_BASE_URL = "http://localhost:5000/users/"

export const getAllUsers = () => {
    return axios.get(USER_API_BASE_URL);
}

export const getUserById = (userId) => {
    return axios.get(USER_API_BASE_URL + userId);
}

export const updateUser = (user) => {
    return axios.put(USER_API_BASE_URL, user);
}

export const deleteUserById = (userId) => {
    return axios.delete(USER_API_BASE_URL + userId);
}