import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import LoginPage from './pages/login.tsx';
import RegisterPage from './pages/register.tsx';
import NotFound from './pages/notfound.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
	},
	{
		path: '/login',
		element: <LoginPage />,
		errorElement: <NotFound />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
		errorElement: <NotFound />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
