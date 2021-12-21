import axios from 'axios';
import querystring from 'querystring';

const { VUE_APP_API_URL, NODE_ENV } = process.env;
const ax = axios.create({
    baseURL: NODE_ENV === 'development' ? '/' : VUE_APP_API_URL,
    timeout: 10000,
});

ax.interceptors.request.use(
    (config) => {
        if (
            config.method === 'get' ||
            config.method === 'post' ||
            config.method === 'put' ||
            config.method === 'delete' ||
            config.method === 'patch'
        ) {
            if (config.headers['Content-Type'] !== 'application/json') {
                config.data = querystring.stringify(config.data);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
ax.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default ax;
