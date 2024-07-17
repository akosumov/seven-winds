import axios from 'axios';

const api = axios.create({
  baseURL: `/api/v1/outlay-rows/entity/129523/row`,
  withCredentials: false,
});

export default api;
