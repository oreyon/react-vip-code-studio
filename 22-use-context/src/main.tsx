import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <h1>404 Not Found</h1>,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</StrictMode>
);
