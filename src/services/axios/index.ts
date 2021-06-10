import axios from 'axios';

export const baseURL = 'http://localhost:3333/';
export const clearAxios = axios.create();

const instance = axios.create({ baseURL });

export default instance;
