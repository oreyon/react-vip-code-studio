import { logout } from '../services/auth.service';

export const useLogout = () => {
	const handleLogout = async () => {
		try {
			await logout();
			window.location.href = '/login';
		} catch (error) {
			console.error(error);
		}
	};

	return handleLogout;
};
