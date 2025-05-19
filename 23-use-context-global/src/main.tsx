import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppContext from './context/app.context.tsx';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/notfound.tsx';
import DashboardPage from './pages/dashboard.tsx';
import LoginPage from './pages/login.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFoundPage />,
	},
	{
		path: '/dashboard',
		element: <DashboardPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
		errorElement: <NotFoundPage />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppContext>
			<RouterProvider router={router} />
			{/* <App /> */}
		</AppContext>
	</StrictMode>
);
