import FormLogin from '../components/Fragments/FormLogin';
import AuthLayouts from '../components/Layouts/AuthLayouts';

const LoginPage = () => {
	return (
		<div className='flex justify-center items-center min-h-screen gap-x-3'>
			<AuthLayouts titleprops='Login' typeprops='login'>
				<FormLogin />
			</AuthLayouts>
		</div>
	);
};
export default LoginPage;
