import { useAuthContext } from '../hooks/useAuthContext';

const DashboardPage = () => {
	const { user } = useAuthContext();

	return (
		<div>
			<h1>Dashboard</h1>
			{user ? (
				<p>Welcome, {user?.username}!</p>
			) : (
				<p>Loading user information...</p>
			)}
		</div>
	);
};

export default DashboardPage;
