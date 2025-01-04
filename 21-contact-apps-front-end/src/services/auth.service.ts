import axios, { AxiosResponse } from 'axios';
import { api } from './product.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type LoginData = {
	email: string;
	password: string;
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
			username: loginData.email,
			password: loginData.password,
		});
		if (response.status === 200) {
			console.log('Login success:', response.data);
			// localStorage.setItem('token', response.data.token);
			// window.location.href = '/products';
		} else {
			throw new Error('Unexpected response status');
		}
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data);
		} else {
			throw new Error('An unexpected error occurred. Please try again.');
		}
	}
};

interface UserData extends JwtPayload {
	user?: string;
}

export const getUserData = async (token: string): Promise<string> => {
	const decode: UserData = await jwtDecode(token);
	if (decode.user) {
		return decode.user;
	} else {
		throw new Error('Failed to fetch user data');
	}
};
