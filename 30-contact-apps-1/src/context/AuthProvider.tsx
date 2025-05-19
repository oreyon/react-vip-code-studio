import { useEffect, useState, type ReactNode } from 'react';
import type { User } from '../types/Auth';
import api from '../services/axios.service';
import { logout } from '../services/auth.service';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isCheckingSession, setIsCheckingSession] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = async () => {
		try {
			const { data } = await api.get(`/auth/current`);
			setUser(data.data);
		} catch {
			setUser(null);
		} finally {
			setIsCheckingSession(false);
		}
	};

	const logoutUser = async () => {
		try {
			await logout();
			setUser(null);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				logout: logoutUser,
				isCheckingSession,
				isAuthenticated,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
