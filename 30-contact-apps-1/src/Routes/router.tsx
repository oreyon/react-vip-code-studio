import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AuthRedirect, ProtectedRoute } from '../components/ProtectedRoute';
import ProfilePage from '../pages/Profile';
import ContactsPage from '../pages/Contact';
import DashboardPage from '../pages/Dashboard';
import LoginPage from '../pages/Login';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <p>Not Found</p>,
	},
	{
		path: '/dashboard',
		element: (
			<ProtectedRoute>
				<DashboardPage />
			</ProtectedRoute>
		),
		errorElement: <p>Not Found</p>,
	},
	{
		path: '/login',
		element: (
			<AuthRedirect>
				<LoginPage />
			</AuthRedirect>
		),
		errorElement: <p>Not Found</p>,
	},
	{
		path: '/logout',
		element: (
			<AuthRedirect>
				<p>Lougout</p>
			</AuthRedirect>
		),
		errorElement: <p>Not Found</p>,
	},
	{
		path: '/profile',
		element: (
			<ProtectedRoute>
				<ProfilePage />
			</ProtectedRoute>
		),
		errorElement: <p>Not Found</p>,
	},
	{
		path: '/contacts',
		element: (
			<ProtectedRoute>
				<ContactsPage />
			</ProtectedRoute>
		),
		errorElement: <p>Not Found</p>,
	},
	{
		path: '/*',
		element: <p>not found</p>,
	},
]);

export default router;
