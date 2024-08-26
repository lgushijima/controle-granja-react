import axios from 'axios';

//const BASE_URL = 'http://localhost:60578';
const BASE_URL = 'https://granjaapi.ushijima.com.br';

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
