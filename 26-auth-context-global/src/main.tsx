import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppContext from './context/auth.context.tsx';
import DashboardPage from './pages/dashboard.tsx';
import LoginPage from './pages/login.tsx';
import ProfilePage from './pages/profile.tsx';
import { ProtectedRoute, AuthRedirect } from './components/ProtectedRoute';
import ContactsPage from './pages/contacts.tsx';

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
		path: '/logout',
		element: <p>Logout</p>,
		errorElement: <p>Not Found</p>,
	},
	{
		path: '/*',
		element: <p>Not Found</p>,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppContext>
			<RouterProvider router={router} />
		</AppContext>
	</StrictMode>
);
