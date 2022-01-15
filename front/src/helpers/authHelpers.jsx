import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:5000/"

export const register = (email, fullname, date, homeAddress, sni, password) => {
    return axios.post(AUTH_API_BASE_URL + "register", { email: email, username: fullname, address: homeAddress, dateOfBirth: date, password: password, sni: sni, admin: false });
}

export const authenticate =  (userEmail, userPassword) => {
    return axios.post(AUTH_API_BASE_URL + "login", { email: userEmail, password: userPassword });
}