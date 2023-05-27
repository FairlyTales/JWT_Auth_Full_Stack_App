import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3500',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	}
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const prevRequest = error.config;

		if (error.response.status === 403 && !prevRequest.sent) {
			prevRequest.sent = true;

			const response = await api.get('/refresh');
			api.defaults.headers.common['Authorization'] = `Bearer ${ response.data.accessToken }`;
			prevRequest.headers['Authorization'] = api.defaults.headers.common['Authorization'];

			return api(prevRequest);
		}

		return Promise.reject(error);
	}
);
