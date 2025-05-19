import { useAuthContext } from './hooks/useAuthContext';

function App() {
	const user = useAuthContext();

	return (
		<>
			<h1>hello, {user.username} </h1>
		</>
	);
}

export default App;
