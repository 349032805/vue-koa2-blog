import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});