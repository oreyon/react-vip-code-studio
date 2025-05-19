import React from 'react';
import { AuthContext, Role, User } from '../hooks/useAuthContext';

type AppContextProps = {
	children: React.ReactNode;
};

const AppContext = (props: AppContextProps) => {
	const user: User = {
		id: 1,
		username: 'Eko Kurniawan Khannedy',
		email: 'eko@example.com',
		role: Role.ADMIN,
	};

	return (
		<AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
	);
};

export default AppContext;
