import { createContext, useContext, useEffect, useState } from 'react';
import { logout } from '../services/auth.service';
import api from '../services/axios.service';

export type User = {
	id: number;
	username: string;
	email: string;
	role: Role;
};

export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export type AuthContextType = {
	user: User | null;
	logout: () => void;
	isLoading: boolean;
	isAuthenticated: boolean;
	isRefreshingToken: boolean;
	setRefreshingToken: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error(
			'useAuthContext must be used within an AuthContext.Provider'
		);
	}
	return auth;
};

type AppContextProps = {
	children: React.ReactNode;
};

const AppContext = ({ children }: AppContextProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);
	const [isRefreshingToken, setIsRefreshingToken] = useState(false);

	const fetchUser = async () => {
		try {
			const { data } = await api.get(`/auth/current`);
			setUser(data.data);
		} catch {
			setUser(null);
		} finally {
			setIsLoading(false);
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
				isLoading,
				isAuthenticated,
				isRefreshingToken,
				setRefreshingToken: setIsRefreshingToken, // Pass state setter
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AppContext;
