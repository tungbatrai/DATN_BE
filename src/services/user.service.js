import {GrantType} from "../constants/GrantType";
import API from "../utils/API";

export const userService = {
    login,
    logout,
    resetPassword,
    reclaimPasswordByEmail,
}

const LOGIN_API_REST_URL = "/user/login"
const LOGOUT_API_REST_URL = "/user/logout"

function login(email, password) {
    return API.post(LOGIN_API_REST_URL, {
        email,
        password,
      //  "grantType": GrantType.CLIENT_CREDENTIALS
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return Promise.reject(error.response.status)
    })
}

function logout() {
    return API.post(LOGOUT_API_REST_URL).then(() => handleResponse)
}

function reclaimPasswordByEmail(email) {
    return API.post(`/users/resetPswd/byEmail`, {email})
}

function resetPassword(newPassword, signature) {
    return API.post(`/users/resetPswd/confirm?sig=${signature}`, {
        newPassword
    })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data
    });
}