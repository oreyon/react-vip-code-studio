import FormRegister from '../components/Fragments/FormRegister';
import AuthLayouts from '../components/Layouts/AuthLayouts';

const RegisterPage = () => {
	return (
		<AuthLayouts titleprops='Register'>
			<FormRegister />
		</AuthLayouts>
	);
};
export default RegisterPage;
