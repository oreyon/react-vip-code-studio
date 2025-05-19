import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated, isCheckingSession } = useAuth();

	if (isCheckingSession) {
		return <div>Loading page...</div>;
	}

	return isAuthenticated ? <>{children}</> : <Navigate to='/login' replace />;
	// return isAuthenticated ? <>{children}</> : (window.location.href = '/login');
	// return isAuthenticated ? (
	// 	<>{children}</>
	// ) : (
	// 	<p>
	// 		Please Login Again <br />
	// 		<button onClick={() => (window.location.href = '/login')}>
	// 			Go to Login Page
	// 		</button>
	// 	</p>
	// );
};

export const AuthRedirect = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated, isCheckingSession } = useAuth();

	if (isCheckingSession) {
		return <div>Loading page...</div>;
	}

	// Redirect if authenticated
	return isAuthenticated ? (
		<Navigate to='/dashboard' replace />
	) : (
		// (window.location.href = '/dashboard')
		// <p>
		// 	You are already logged in. <br />
		// 	<button onClick={() => (window.location.href = '/dashboard')}>
		// 		Go to Dashboard
		// 	</button>
		// </p>
		<>{children}</>
	);
};
