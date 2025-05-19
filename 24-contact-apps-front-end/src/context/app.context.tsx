import React, { useEffect } from 'react';
import { AuthContext, User } from '../hooks/useAuthContext';
import { getCurrentUser, logout } from '../services/auth.service';
import axios from 'axios';

type AppContextProps = {
	children: React.ReactNode;
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

const AppContext = (props: AppContextProps) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [user, setUser] = React.useState<User | null>(null);

	const saveUser = (user: User) => {
		setUser(user);
		setIsLoading(false);
	};

	const removeUser = () => {
		setUser(null);
		setIsLoading(false);
	};

	const performLogout = async () => {
		try {
			await logout();
			removeUser();
			window.location.href = '/login';
		} catch (error) {
			errorMessage(error);
			removeUser();
		}
	};

	const fetchUser = async () => {
		try {
			const user = await getCurrentUser();
			saveUser(user);
			window.location.href = '/dashboard';
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				window.location.href = '/login';
			} else {
				console.error(error);
			}
			removeUser();
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	// const user: User = {
	// 	id: 1,
	// 	username: 'admin',
	// 	email: 'alskdjaslk',
	// 	role: Role.ADMIN,
	// };

	return (
		<AuthContext.Provider value={{ user, logout: performLogout, isLoading }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AppContext;
