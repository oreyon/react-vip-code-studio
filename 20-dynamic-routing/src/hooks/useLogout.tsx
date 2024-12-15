export const useLogout = () => {
	const logout = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		localStorage.removeItem('token');
		window.location.href = '/';
	};

	return logout;
};
