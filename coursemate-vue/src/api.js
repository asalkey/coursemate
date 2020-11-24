import axios from 'axios';

const config = {
        baseURL: 'http://68.183.127.208/app',
};

export const instance = axios.create(config);
