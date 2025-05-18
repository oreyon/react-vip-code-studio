import { useAuthContext } from '../context/auth.context';

const DashboardPage = () => {
	const auth = useAuthContext();
	if (!auth.user) {
		return null;
	}
	return (
		<div>
			DashboardPage <br />
			Hello, {auth.user.username}
			{/* button logout */}
			<button onClick={auth.logout}>Logout</button>
		</div>
	);
};
export default DashboardPage;
