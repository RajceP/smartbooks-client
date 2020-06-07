import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3002/',
});

export const setHeaders = (token) => {
  instance.defaults.headers['x-auth-token'] = token;
  return instance;
};

export default instance;
