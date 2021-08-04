import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const baseURL = 'http://localhost:3333/';
export const clearAxios = instance;

instance.interceptors.request.use((config) => {
  return { ...config, baseURL };
});

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;
