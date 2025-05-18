import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth.context';

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading, isRefreshingToken } = useAuthContext();

	if (isLoading || isRefreshingToken) {
		return <div>Loading...ProtectedRoute</div>;
	}

	return isAuthenticated ? <>{children}</> : <Navigate to='/login' replace />;
};

export const AuthRedirect = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading, isRefreshingToken } = useAuthContext();

	// Wait for loading and token refresh to complete
	if (isLoading || isRefreshingToken) {
		return <div>Loading...AuthRedirect</div>;
	}

	// Redirect if authenticated
	return isAuthenticated ? (
		<Navigate to='/dashboard' replace />
	) : (
		<>{children}</>
	);
};
