import { useAuthContext } from '../hooks/useAuthContext';

const ProfilePage = () => {
	const { user } = useAuthContext();

	return (
		<div>
			<h1>Profile</h1>
			<p>Username: {user?.username}</p>
			<p>Email: {user?.email}</p>
			<p>Role: {user?.role}</p>
		</div>
	);
};

export default ProfilePage;
