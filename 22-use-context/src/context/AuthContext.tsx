import axios, { AxiosInstance } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

// Define the context structure
interface AuthContextProps {
	user: User | null;
	saveUser: (user: User) => void;
	removeUser: () => void;
	logoutUser: () => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

const AppContext = createContext<AuthContextProps | undefined>(undefined);

export const useGlobalContext = (): AuthContextProps => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useGlobalContext must be used within an AppProvider');
	}
	return context;
};

type AppProviderProps = {
	children: React.ReactNode;
};

enum Role {
	ADMIN = 'admin',
	USER = 'user',
}

type User = {
	id?: number;
	email?: string;
	username?: string;
	role?: Role;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Configure Axios instance
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: 'http://localhost:3000/api/v1',
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});

	const saveUser = (user: User) => setUser(user);
	const removeUser = () => setUser(null);

	const getCurrentUser = async () => {
		try {
			const response = await axiosInstance.get('/auth/current');
			saveUser(response.data.data);
		} catch (err: unknown) {
			setError('Failed to fetch user');
			removeUser();
		} finally {
			setIsLoading(false);
		}
	};

	const logoutUser = async () => {
		try {
			await axiosInstance.delete('/auth/logout');
			removeUser();
		} catch (err: unknown) {
			setError('Logout failed');
		}
	};

	useEffect(() => {
		getCurrentUser();
	}, []);

	return (
		<AppContext.Provider
			value={{ user, saveUser, removeUser, logoutUser, isLoading, error }}>
			{children}
		</AppContext.Provider>
	);
};
