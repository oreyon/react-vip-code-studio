import { useEffect, useState } from 'react';
import { getUserData } from '../services/auth.service';

const useLogin = () => {
	const [username, setUsername] = useState<string>('');

	// listen token from local storage
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			getUserData(token)
				.then((data: string) => {
					setUsername(data);
				})
				.catch((error) => {
					console.error('Failed to fetch user data:', error);
				});
		} else {
			window.location.href = '/';
		}
	}, []);

	return username;
};

export default useLogin;