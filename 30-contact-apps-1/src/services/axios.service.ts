import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
// import { triggerLogout } from '../context/LogoutHandler';

const baseURL = 'http://localhost:3000/api/v1';
// const baseURL = 'https://nestjs-11-mikro-orm-10.vercel.app/api/v1';

// Create the Axios instance
export const api = axios.create({
	baseURL: `${baseURL}`,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: AxiosError | null, tokenRefreshed = false) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve(tokenRefreshed);
	});
	failedQueue = [];
};

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes('/auth/refresh-token')
		) {
			originalRequest._retry = true;

			if (!isRefreshing) {
				isRefreshing = true;

				try {
					await api.post('/auth/refresh-token'); // Refresh token
					isRefreshing = false;
					processQueue(null, true);
					return api(originalRequest); // Retry original request
				} catch (refreshError) {
					isRefreshing = false;
					processQueue(refreshError as AxiosError, false);

					// console.error('Refresh token failed:', refreshError);
					// triggerLogout();

					return Promise.reject(refreshError);
				}
			}

			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			}).then(() => api(originalRequest));
		}

		return Promise.reject(error);
	}
);

export default api;
