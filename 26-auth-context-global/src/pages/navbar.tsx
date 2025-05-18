import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/auth.context';

const navigation = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Products', href: '/products' },
];

const profile = [
	{ name: 'Profile', href: '/profile' },
	{ name: 'Settings', href: '/settings' },
];

const Navbar = () => {
	const { user, logout } = useAuthContext();

	return (
		<nav>
			<div>
				<div>
					{/* Navigation Menu */}
					<ul>
						{navigation.map((item) => (
							<li key={item.name}>
								<Link to={item.href}>{item.name}</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					{/* Profile Dropdown or Login */}
					{user ? (
						<div>
							<span>Welcome, {user.username}</span>
							<div>
								<h4>My Account</h4>
								<ul>
									{profile.map((item) => (
										<li key={item.name}>
											<Link to={item.href}>{item.name}</Link>
										</li>
									))}
								</ul>
								<button onClick={logout}>Logout</button>
							</div>
						</div>
					) : (
						<Link to='/login'>Login</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
