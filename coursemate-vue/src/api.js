import axios from 'axios';

const config = {
        baseURL: 'http://localhost:8000',
};

export const instance = axios.create(config);
