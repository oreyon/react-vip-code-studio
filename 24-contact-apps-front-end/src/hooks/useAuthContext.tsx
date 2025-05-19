import { createContext, useContext } from 'react';

export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export type User = {
	id: number;
	username: string;
	email: string;
	role: Role;
};

export type AuthContextType = {
	user: User | null;
	logout: () => Promise<void>;
	isLoading: boolean;
};

// GlobalContext for authenticaed user
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
	const user = useContext(AuthContext);
	if (!user) {
		throw new Error(
			'useGlobalContext must be used within a GlobalContext.Provider'
		);
	}

	return user;
};
