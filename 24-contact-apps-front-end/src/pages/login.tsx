import React, { useState } from 'react';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login({ email, password });
			navigate('/dashboard'); // Redirect to dashboard on successful login
		} catch (err: any) {
			setError(err.message || 'Failed to log in');
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default LoginPage;
