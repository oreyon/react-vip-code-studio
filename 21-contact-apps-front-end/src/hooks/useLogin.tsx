import { useEffect, useState } from 'react';
import { getCurrentUser, UserData } from '../services/auth.service';
import { AxiosError } from 'axios';

const useLogin = (): string => {
	const [username, setUsername] = useState<string>(''); // Default is an empty string

	useEffect(() => {
		getCurrentUser()
			.then((data: UserData) => {
				setUsername(data.username);
			})
			.catch((error: AxiosError) => {
				console.error('Error fetching user:', error.message);
			});
	}, []); // Empty dependency array ensures this runs once on component mount

	return username;
};

export default useLogin;