import axios from 'axios';

export const api = new axios({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 5000,
	headers: { 'Access-Control-Allow-Origin': '*' },
});
