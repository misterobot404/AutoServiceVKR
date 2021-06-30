import axios from "axios"
import store from './../store'

// check auth
let authToken = window.localStorage.getItem('token');
if (authToken) {
    // add token to axios header
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
}

// 401 errors logout user
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.commit("auth/LOGOUT", null, {root: true});
        } else return Promise.reject(error);
    });
