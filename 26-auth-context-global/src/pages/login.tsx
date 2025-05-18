import { useState } from 'react';
import { login } from '../services/auth.service';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent the form from refreshing the page
		setError(null);
		setIsLoading(true);

		try {
			await login({ email, password });
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unexpected error occurred.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: '10px' }}>
					<label
						htmlFor='email'
						style={{ display: 'block', marginBottom: '5px' }}>
						Email
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						style={{ width: '100%', padding: '8px' }}
					/>
				</div>
				<div style={{ marginBottom: '10px' }}>
					<label
						htmlFor='password'
						style={{ display: 'block', marginBottom: '5px' }}>
						Password
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={{ width: '100%', padding: '8px' }}
					/>
				</div>
				<button
					type='submit'
					disabled={isLoading}
					style={{
						width: '100%',
						padding: '10px',
						backgroundColor: '#007BFF',
						color: '#FFF',
						border: 'none',
						cursor: 'pointer',
					}}>
					{isLoading ? 'Logging in...' : 'Login'}
				</button>
			</form>
			{error && (
				<p style={{ color: 'red', marginTop: '10px' }}>
					<strong>Error:</strong> {error}
				</p>
			)}
		</div>
	);
};

export default LoginPage;
