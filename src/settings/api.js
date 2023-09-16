import axios from 'axios'
import { baseURL } from "./urls";


const api = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

api.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('friendTraderAccess')
        config.headers["Authorization"] = `Bearer ${accessToken}`
        return config;
    },
    error => {
      Promise.reject(error);
    }
  );

export default api