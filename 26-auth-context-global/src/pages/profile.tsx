import { useAuthContext } from '../context/auth.context';
import Navbar from './navbar';

const ProfilePage = () => {
	const { user, logout } = useAuthContext();
	if (!user) {
		return null;
	}

	return (
		<div>
			<Navbar />
			ProfilePage <br />
			Hello, {user.username}
			{/* button logout */}
			<button onClick={logout}>Logout</button>
		</div>
	);
};
export default ProfilePage;
