import axios from 'axios'
// import { urls } from "../settings/constants";


const api = axios.create({
    baseURL: "http://localhost:8000",
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