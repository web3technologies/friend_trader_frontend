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
        if (accessToken){
          config.headers["Authorization"] = `Bearer ${accessToken}`
        }
        return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('friendTraderAccess');
            if (!error.config._retry) {
                delete error.config.headers["Authorization"];
                error.config._retry = true;
                return api(error.config);
            }
        }
        return Promise.reject(error);
    }
);


export default api