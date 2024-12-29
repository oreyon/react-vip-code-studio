import { Link } from 'react-router-dom';

export const useLogout = () => {
	const logout = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('token');
		<Link to='/' />;
	};

	return logout;
};
