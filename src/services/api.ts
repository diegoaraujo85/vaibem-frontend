import axios from 'axios';

// const url = 'http://localhost:3333/';
const url = 'https://vaibem-backend.herokuapp.com';

const api = axios.create({
  baseURL: url,
});

export default api;
