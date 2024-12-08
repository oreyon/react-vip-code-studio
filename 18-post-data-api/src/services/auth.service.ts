import api from './axios.service';

interface RegisterResponse {
	code: number;
	status: string;
	data: {
		id: string;
		username: string;
		email: string;
		emailVerificationToken: string;
	};
}

// Registration
export const registerUser = async (
	email: string,
	password: string,
	username: string
) => {
	return await api.post<RegisterResponse>('/auth/register', {
		email,
		password,
		username,
	});
};

// Email Verification
export const verifyEmail = async (
	email: string,
	emailVerificationToken: string
) => {
	return await api.post('/auth/verify-email', {
		email,
		emailVerificationToken,
	});
};

// Login
export const loginUser = async (email: string, password: string) => {
	return await api.post('/auth/login', { email, password });
};

// Logout
export const logoutUser = async () => {
	return await api.post('/auth/logout');
};

// Get Current User
export const getCurrentUser = async () => {
	return await api.get('/auth/current');
};
