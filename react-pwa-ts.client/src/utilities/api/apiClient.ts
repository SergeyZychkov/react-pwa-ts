import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
 
const token = "testToken";

const config: Object = {
    baseURL: '/api',
    timeout: 10000
};

export const apiClient = Axios.create(config); 

apiClient.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, 
    error => Promise.reject(error));

export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise = apiClient({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data);
 
    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };
 
    return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;

export default apiClient;