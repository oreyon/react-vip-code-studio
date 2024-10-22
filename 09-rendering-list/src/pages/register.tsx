import FormRegister from '../components/Fragments/FormRegister';
import AuthLayouts from '../components/Layouts/AuthLayouts';

const RegisterPage = () => {
	return (
		<div className='flex justify-center items-center min-h-screen gap-x-3'>
			<AuthLayouts titleprops='Register' typeprops='register'>
				<FormRegister />
			</AuthLayouts>
		</div>
	);
};
export default RegisterPage;
