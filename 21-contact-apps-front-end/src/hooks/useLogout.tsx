import { logout } from '../services/auth.service';

const useLogout = () => {
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

export default useLogout;