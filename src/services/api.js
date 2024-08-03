import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
	baseURL: API_URL,
	timeout: 30_000,
	headers: { api: `${API_KEY}`, 'Content-Type': 'application/json' },
});

export { api };
