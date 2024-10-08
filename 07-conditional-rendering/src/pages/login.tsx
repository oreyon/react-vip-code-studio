import { Link } from 'react-router-dom';
import FormLogin from '../components/Fragments/FormLogin';
import AuthLayouts from '../components/Layouts/AuthLayouts';

const LoginPage = () => {
	return (
		<div className='flex justify-center items-center min-h-screen gap-x-3'>
			<AuthLayouts titleprops='Login'>
				<FormLogin />
				<p className='text-sm mt-5 text-center'>
					Don't have an account?{' '}
					<Link to='/register' className='font-bold text-blue-600'>
						Register
					</Link>
				</p>
			</AuthLayouts>
		</div>
	);
};
export default LoginPage;
