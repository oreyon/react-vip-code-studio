import axios, { AxiosResponse } from 'axios';
import api from './axios.service';
// import { jwtDecode, JwtPayload } from 'jwt-decode';

export type UserData = {
	email: string;
	image: string;
	username: string;
	role: string;
};

type LoginData = {
	email: string;
	password: string;
};

// Define the structure of a single error
export type ValidationError = {
	code: string; // e.g., "invalid_string" or "too_small"
	message: string; // Error message string
	path?: string[]; // Path to the field, e.g., ["email"]
	validation?: string; // Type of validation, e.g., "email"
	minimum?: number; // For numeric/string size validation
	type?: string; // Error type, e.g., "string"
	inclusive?: boolean; // Inclusive range, e.g., true/false
	exact?: boolean; // Exact match required, e.g., true/false
};

// Define the structure of the full error response
export type ValidationErrorResponse = {
	code: number; // HTTP status code, e.g., 400
	errors: ValidationError[]; // Array of validation errors
};

/*
username: johnd
password: m38rmF$

username: donero
password: ewedon
*/

export const login = async (loginData: LoginData): Promise<void> => {
	try {
		const response: AxiosResponse = await api.post('/auth/login', {
			email: loginData.email,
			password: loginData.password,
		});
		console.log(`RESPONSE STATUS =  ${response.status}`);
		console.dir(`response.config = ${response.config}`, { depth: null });
		console.dir(`response.request = ${response.request}`, { depth: null });
		console.log(`response.statusText = ${response.statusText}`);
		if (response.status === 200) {
			window.location.href = '/profile';
		} else {
			throw new Error('Unexpected response status');
		}
	} catch (error: unknown) {
		errorMessage(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const result = await api.get('/auth/current');
		return result.data.data;
	} catch (error) {
		errorMessage(error);
	}
};

export const logout = async (): Promise<void> => {
	try {
		const response: AxiosResponse = await api.delete('/auth/logout');
		if (response.status === 204) {
			window.location.href = '/login';
		}
	} catch (error) {
		handleError(error, 'Failed to log out.');
	}
};

const errorMessage = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		const responseData = error.response?.data;
		const defaultMessage = responseData?.errors
			? JSON.stringify(responseData.errors)
			: 'An unknown error occurred';
		handleError(error, defaultMessage);
	} else {
		handleError(error, 'An unexpected error occurred. Please try again.');
	}
};

const handleError = (error: unknown, defaultMessage: string): void => {
	if (axios.isAxiosError(error)) {
		const responseData = error.response?.data;

		// Check if the response has the expected structure
		if (
			responseData &&
			typeof responseData === 'object' &&
			Array.isArray(responseData.errors)
		) {
			const errors = responseData.errors as ValidationError[];
			const messages = errors.map((err) => err.message).join(', ');
			throw new Error(messages); // Re-throw with detailed error messages
		} else {
			// Fallback for unexpected error structure
			throw new Error(responseData?.message || defaultMessage);
		}
	} else {
		// For non-Axios errors
		throw new Error(defaultMessage);
	}
};
