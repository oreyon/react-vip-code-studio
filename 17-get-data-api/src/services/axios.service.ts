// src/api/axiosInstance.ts
import axios, { AxiosError } from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];

// Function to process the failed request queue
const processQueue = (
	error: AxiosError | null,
	token: string | null = null
) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

// Create the Axios instance
const api = axios.create({
	baseURL: 'http://localhost:3000/api/v1', // Adjust the base URL as needed
	withCredentials: true, // Enable cookies for requests
});

// Axios interceptor for handling token expiration
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config;

		// Check if the error status is 401 (Unauthorized) and the request has not been retried
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// If token refresh is already in progress, queue the request
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => {
						return api(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			// Attempt to refresh the tokens
			return new Promise((resolve, reject) => {
				api
					.post('/auth/refresh-token')
					.then(() => {
						// After refreshing tokens, resolve the queued requests
						processQueue(null);
						resolve(api(originalRequest)); // Retry the original request
					})
					.catch((err) => {
						// Reject all queued requests if refresh fails
						processQueue(err, null);
						reject(err);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}

		return Promise.reject(error);
	}
);

export default api;
