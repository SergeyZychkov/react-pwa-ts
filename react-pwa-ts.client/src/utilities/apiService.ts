import axios from 'axios';

const token = "testToken";

const config: Object = {
    baseURL: '/api',
    timeout: 10000
};

const apiClient = axios.create(config);

apiClient.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, 
    error => Promise.reject(error));

export default apiClient;