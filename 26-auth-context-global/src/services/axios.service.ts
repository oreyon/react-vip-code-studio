// src/api/axiosInstance.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// const baseURL = 'http://localhost:3000/api/v1';
const baseURL = 'https://nestjs-11-mikro-orm-10.vercel.app/api/v1';

// Create the Axios instance
export const api = axios.create({
	baseURL: `${baseURL}`,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

// ========================================================================
// let isRefreshing = false;
// let failedQueue: {
// 	resolve: (value?: unknown) => void;
// 	reject: (reason?: unknown) => void;
// }[] = [];

// interface CustomAxiosRequestConfig extends AxiosRequestConfig {
// 	_retry?: boolean; // Optional boolean property
// }

// Function to process the failed request queue
// const processQueue = (
// 	error: AxiosError | null,
// 	token: string | null = null
// ) => {
// 	failedQueue.forEach((prom) => {
// 		if (error) {
// 			prom.reject(error);
// 		} else {
// 			prom.resolve(token);
// 		}
// 	});
// 	failedQueue = [];
// };

// Request interceptor for handling token refresh
// api.interceptors.request.use(
// 	async (config) => {
// 		// If the request is for refresh-token, skip adding retry logic here
// 		if (config.url?.includes('/auth/refresh-token')) {
// 			return config;
// 		}

// 		// If the request is not for refresh-token, you can apply your logic here
// 		// e.g., check if the user is authenticated, or attach the current token if available
// 		// You can proceed without changing this logic if no specific action is needed for requests
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// Response interceptor for handling token refresh errors specifically
// api.interceptors.response.use(
// 	(response) => response,
// 	async (error: AxiosError) => {
// 		const originalRequest = error.config as CustomAxiosRequestConfig;

// 		// If the error status is 401 (Unauthorized) and the request is for refresh-token
// 		if (
// 			error.response?.status === 401 &&
// 			originalRequest._retry &&
// 			originalRequest.url?.includes('/auth/refresh-token')
// 		) {
// 			console.log('401 Unauthorized on refresh-token. Redirecting to login.');

// 			// Redirect to login page immediately
// 			window.location.href = '/login'; // This will redirect to login page
// 			return Promise.reject(error); // Reject the error to stop any further requests
// 		}

// 		// Handle other 401 errors (e.g., for the user’s initial request, like /profile)
// 		if (error.response?.status === 401) {
// 			console.log(
// 				'401 Unauthorized error encountered. Retrying token refresh.'
// 			);

// 			// Proceed with refresh logic if it's not already in progress
// 			if (!isRefreshing) {
// 				isRefreshing = true;
// 				return new Promise((resolve, reject) => {
// 					api
// 						.post('/auth/refresh-token') // Attempt to refresh the token
// 						.then((res) => {
// 							// After successful refresh, retry the original request
// 							console.log('Token refresh successful.');
// 							processQueue(null, res.data.token); // Provide new token to queued requests
// 							resolve(api(originalRequest)); // Retry the original request
// 						})
// 						.catch((err) => {
// 							// If refresh fails, clear the queue and redirect to login
// 							console.error('Error refreshing token:', err.message);
// 							processQueue(err, null);
// 							isRefreshing = false;
// 							window.location.href = '/login'; // Redirect to login page
// 							reject(err); // Reject the original request
// 						});
// 				});
// 			}

// 			// If a token refresh is already in progress, queue the request to retry later
// 			return new Promise((resolve, reject) => {
// 				failedQueue.push({ resolve, reject });
// 			}).then(() => {
// 				return api(originalRequest); // Retry original request after token refresh
// 			});
// 		}

// 		// Reject all other errors as usual
// 		return Promise.reject(error);
// 	}
// );
// ========================================================================

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

			/*
			if originalRequest.url?.includes('/auth/refresh-token')
			after accesstoken is expired, it will redirect to login page
			when we try to go /dashboard page, it will redirect to login page

			if !originalRequest.url?.includes('/auth/refresh-token')
			after accesstoken is expired, it will refresh the accesstoken
			when we try to go /dashboard page, it will redirect to login page but have infinite loop

			how to fix this?
			*/
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
					// window.location.href = '/login'; // Redirect on refresh failure
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

// api.interceptors.response.use(
// 	(response) => response,
// 	async (error: AxiosError) => {
// 		const originalRequest = error.config as AxiosRequestConfig & {
// 			_retry?: boolean;
// 		};

// 		// If the error status is 401
// 		if (error.response?.status === 401) {
// 			// Prevent an infinite loop for the refresh token request itself
// 			if (originalRequest.url?.includes('/auth/refresh-token')) {
// 				console.error(
// 					'Refresh token request failed with 401. Redirecting to login.'
// 				);
// 				// window.location.href = '/login';
// 				return Promise.reject(error);
// 			}

// 			// Handle other 401 cases
// 			if (!originalRequest._retry) {
// 				originalRequest._retry = true;

// 				if (!isRefreshing) {
// 					isRefreshing = true;

// 					try {
// 						const response = await api.post('/auth/refresh-token'); // Refresh the token
// 						isRefreshing = false;

// 						// Update token in headers or storage if needed
// 						const newAccessToken = response.data.accessToken; // Assume this returns the new token
// 						api.defaults.headers.common[
// 							'Authorization'
// 						] = `Bearer ${newAccessToken}`;

// 						// Retry failed requests
// 						processQueue(null, true);
// 						return api(originalRequest);
// 					} catch (refreshError) {
// 						isRefreshing = false;
// 						processQueue(refreshError as AxiosError, false);
// 						console.error('Refresh token failed:', refreshError);

// 						// Redirect to login on refresh failure
// 						// window.location.href = '/login';
// 						return Promise.reject(refreshError);
// 					}
// 				}

// 				// If refresh is already in progress, queue the failed request
// 				return new Promise((resolve, reject) => {
// 					failedQueue.push({ resolve, reject });
// 				}).then(() => api(originalRequest));
// 			}
// 		}

// 		return Promise.reject(error);
// 	}
// );

export default api;
