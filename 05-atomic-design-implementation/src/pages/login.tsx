import FormLogin from '../components/Fragments/FormLogin';
import AuthLayouts from '../components/Layouts/AuthLayouts';

const LoginPage = () => {
	return (
		<AuthLayouts titleprops='Login'>
			<FormLogin />
		</AuthLayouts>
	);
};
export default LoginPage;
