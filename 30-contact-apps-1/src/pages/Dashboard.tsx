import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
	const { user, logout } = useAuth();

	return (
		<div>
			DashboardPage <br />
			Hello, {user?.username}
			{/* go to profile page */}
			<div className=''>
				<Link to={'/profile'}>Profile</Link>
			</div>
			<button onClick={logout}>Logout</button>
		</div>
	);
};
export default DashboardPage;
