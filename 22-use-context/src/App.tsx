import './App.css';
import { useGlobalContext } from './context/AuthContext';

function App() {
	const { isLoading, user, error } = useGlobalContext();

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>Error: {error}</h1>;
	}

	return (
		<div className='App'>
			<h1>Welcome {user?.username || 'Guest'}</h1>
			<p>Email: {user?.email || 'No email'}</p>
			<p>Role: {user?.role || 'No role assigned'}</p>
		</div>
	);
}

export default App;
