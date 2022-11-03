import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_LIST
} from './types'

export function addtolist(dataTosubmit) {
    const request = axios.post('/api/main', dataTosubmit)
    .then(response => response.data)

    return {
        type : ADD_TO_LIST,
        payload : request
    }
}

export function loginUser(dataTosubmit) {
    const request = axios.post('/api', dataTosubmit)
    .then(response => response.data)

    return {
        type : LOGIN_USER,
        payload : request
    }
}

export function auth() {
    const request = axios.get('/api/auth')
    .then(response => response.data)

    return {
        type : AUTH_USER,
        payload : request
    }

}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/register', dataToSubmit)
    .then(response => response.data);

    return {
        type : REGISTER_USER,
        payload : request
    }
}