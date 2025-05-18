// src/api/axiosInstance.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import environment from "@/config/environment.ts";

let isRefreshing = false;
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}[] = [];

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean; // Optional boolean property
}

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

const baseURL = environment.BACKEND_API_URL;

// Create the Axios instance
export const api = axios.create({
	baseURL: `${baseURL}`,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

/*
// Axios interceptor for handling token expiration
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		
		const originalRequest = error.config as CustomAxiosRequestConfig;

		// Check if the error status is 401 (Unauthorized) and the request has not been retried
		if (error.response?.status === 401 && !originalRequest._retry) {
			console.log(
				'401 Unauthorized error encountered. Retrying token refresh.'
			); // Log when 401 occurs

			if (isRefreshing) {
				console.log('Waiting for token refresh to complete.');
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
						console.log('Token refresh successful.'); // Log successful refresh
						processQueue(null);
						resolve(api(originalRequest)); // Retry the original request
					})
					.catch((err) => {
						console.error('Error refreshing token:', err.message); // Log refresh error

						if (err.response?.status === 401) {
							console.log('Refresh token is invalid. Redirecting to login.');

							// Clear any failed requests in the queue and reset the flag
							processQueue(err, null);
							isRefreshing = false;

							// Redirect to the login page
							window.location.href = '/login'; // This will redirect to login page
						} else {
							// Handle any other error status codes
							processQueue(err, null);
							reject(err);
						}
					})
					.finally(() => {
						isRefreshing = false;
						console.log('Token refresh process completed.');
					});
			});
		}

		return Promise.reject(error);
	}
);
*/

// ========================================================================
// Request interceptor for handling token refresh
api.interceptors.request.use(
	async (config) => {
		// If the request is for refresh-token, skip adding retry logic here
		if (config.url?.includes('/auth/refresh-token')) {
			return config;
		}

		// If the request is not for refresh-token, you can apply your logic here
		// e.g., check if the user is authenticated, or attach the current token if available
		// You can proceed without changing this logic if no specific action is needed for requests
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for handling token refresh errors specifically
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig;

		// If the error status is 401 (Unauthorized) and the request is for refresh-token
		if (
			error.response?.status === 401 &&
			originalRequest.url?.includes('/auth/refresh-token')
		) {
			console.log('401 Unauthorized on refresh-token. Redirecting to login.');

			// Redirect to login page immediately
			window.location.href = '/login'; // This will redirect to login page
			return Promise.reject(error); // Reject the error to stop any further requests
		}

		// Handle other 401 errors (e.g., for the user’s initial request, like /profile)
		if (error.response?.status === 401) {
			console.log(
				'401 Unauthorized error encountered. Retrying token refresh.'
			);

			// Proceed with refresh logic if it's not already in progress
			if (!isRefreshing) {
				isRefreshing = true;
				return new Promise((resolve, reject) => {
					api
						.post('/auth/refresh-token') // Attempt to refresh the token
						.then((res) => {
							// After successful refresh, retry the original request
							console.log('Token refresh successful.');
							processQueue(null, res.data.token); // Provide new token to queued requests
							resolve(api(originalRequest)); // Retry the original request
						})
						.catch((err) => {
							// If refresh fails, clear the queue and redirect to login
							console.error('Error refreshing token:', err.message);
							processQueue(err, null);
							isRefreshing = false;
							window.location.href = '/login'; // Redirect to login page
							reject(err); // Reject the original request
						});
				});
			}

			// If a token refresh is already in progress, queue the request to retry later
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			}).then(() => {
				return api(originalRequest); // Retry original request after token refresh
			});
		}

		// Reject all other errors as usual
		return Promise.reject(error);
	}
);

export default api;
