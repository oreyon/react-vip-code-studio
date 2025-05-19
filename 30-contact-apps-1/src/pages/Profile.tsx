import { useAuth } from '../hooks/useAuth';
import Navbar from './Navbar';

const ProfilePage = () => {
	const { user, logout } = useAuth();

	return (
		<div>
			<Navbar />
			ProfilePage <br />
			Hello, {user?.username}
			<button onClick={logout} aria-label={'logout'} type='button'>
				Logout
			</button>
		</div>
	);
};
export default ProfilePage;
