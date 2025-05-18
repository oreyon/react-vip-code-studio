import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import LoginPage from './pages/login.tsx';
import RegisterPage from './pages/register.tsx';
import NotFound from './pages/notfound.tsx';
import ProductsPage from './pages/products.tsx';
import ProfilePage from './pages/profile.tsx';
import DetailProductPage from './pages/detailProduct.tsx';
import DashboardPage from './pages/dashboard.tsx';
// import { AuthProvider } from './context/AuthContext.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
	},
	{
		path: '/dashboard',
		element: <DashboardPage />,
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
	{
		path: '/products',
		element: <ProductsPage />,
		errorElement: <NotFound />,
	},
	{
		path: '/profile',
		element: <ProfilePage />,
		errorElement: <NotFound />,
	},
	{
		path: '/logout',
		element: <LoginPage />,
		errorElement: <NotFound />,
	},
	{
		path: '/products/:id',
		element: <DetailProductPage />,
		errorElement: <NotFound />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		 {/*<AuthProvider>*/}
		<RouterProvider router={router} />
		 {/*</AuthProvider>*/}
	</StrictMode>
);
