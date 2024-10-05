import { Link } from 'react-router-dom';
import FormRegister from '../components/Fragments/FormRegister';
import AuthLayouts from '../components/Layouts/AuthLayouts';

const RegisterPage = () => {
	return (
		<div className='flex justify-center items-center min-h-screen gap-x-3'>
			<AuthLayouts titleprops='Register'>
				<FormRegister />
				<p className='text-sm mt-5 text-center'>
					Already have an account?{' '}
					<Link to='/login' className='font-bold text-blue-600'>
						Login
					</Link>
				</p>
			</AuthLayouts>
		</div>
	);
};
export default RegisterPage;
