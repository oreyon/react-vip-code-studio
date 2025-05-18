import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, UserData } from '../services/auth.service';
const AuthContext = createContext<UserData | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<UserData | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getCurrentUser();
				setUser(userData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUser();
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
