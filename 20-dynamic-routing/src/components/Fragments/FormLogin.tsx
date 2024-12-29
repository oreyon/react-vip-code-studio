import { useEffect, useRef, useState } from 'react';
import Button from '../Elements/Button/Button';
import InputForm from '../Elements/Input';
import { login } from '../../services/auth.service';

const FormLogin = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string | null>(null);
	const [passwordType, setPasswordType] = useState<string>('password');
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	useEffect(() => {
		// focus on email input when component is mounted
		if (usernameRef.current) {
			usernameRef.current.focus();
		}
	}, []);

	const handleLogin = async (event: React.BaseSyntheticEvent<Event>) => {
		event.preventDefault();

		/* 
		React.FormEvent<HTMLFormElement>
		cara memanggil: event.currentTarget.email.value
		jika ingin sama dengan tutorial maka perlu menggunakan cara ini,
		agar event dianggap sebagai elemen form
		*/

		// const form = event.target as HTMLFormElement;
		// console.log(form.email.value);

		/* 
		React.BaseSyntheticEvent<Event>
		cara memanggil: event.target.email.value
		Base Synthetic Event adalah event yang dihasilkan oleh React
		jadi tidak perlu tidak merlu mendefinisikan event.target sebagai HTMLFormElement
		*/

		// console.log(event.target.email.value);
		// console.log(event.target.password.value);

		// save email to localStorage
		// localStorage.setItem('email', event.target.email.value);
		// localStorage.setItem('password', event.target.password.value);

		// redirect to products
		// window.location.href = '/products';

		const data = {
			username: event.target.username.value,
			password: event.target.password.value,
		};

		try {
			await login(data);
			console.log('Login success');
		} catch (error: unknown) {
			if (typeof error === 'object' && error && 'message' in error) {
				setError((error as { message: string }).message);
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		}
	};

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
		setPasswordType((prevType) =>
			prevType === 'password' ? 'text' : 'password'
		);
	};

	return (
		<form action='' onSubmit={handleLogin}>
			<InputForm
				label='Username'
				name='username'
				type='text'
				placeholder='your-username'
				// refProps={emailRef}
				ref={usernameRef}
			/>
			<InputForm
				label='Password'
				name='password'
				type={passwordType}
				placeholder='*******'
				onTogglePassword={togglePasswordVisibility}
				isPasswordField={true}
				passwordVisible={passwordVisible}
			/>
			<Button type='submit' className='bg-blue-600 w-full'>
				Login
			</Button>
			{error && <p className='text-red-500 text-center mt-5'>{error}</p>}
		</form>
	);
};
export default FormLogin;
