import axios from 'axios'

export const api = axios.create({
	baseURL: `http://185.244.172.108:8081/v1/outlay-rows/entity/129523/row`,
	withCredentials: false,
})
