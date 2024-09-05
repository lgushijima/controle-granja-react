import axios from 'axios';

//const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = import.meta.env.VITE_API_URL;

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
});
