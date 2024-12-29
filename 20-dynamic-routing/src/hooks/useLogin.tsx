import { useEffect, useState } from 'react';
import { getUserData } from '../services/auth.service';
import { Link } from 'react-router-dom';

export const useLogin = () => {
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
			<Link to='/' />;
		}
	}, []);

	return username;
};
