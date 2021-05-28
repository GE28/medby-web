import axios from 'axios';

export const baseURL = 'http://localhost:3333/';

const instance = axios.create({ baseURL });

export default instance;
