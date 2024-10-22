import Button from '../Elements/Button/Button';
import InputForm from '../Elements/Input';

const FormLogin = () => {
	return (
		<form action=''>
			<InputForm
				labelprops='Email'
				nameprops='email'
				typeprops='email'
				placeholderprops='example@mail.com'
			/>
			<InputForm
				labelprops='Password'
				nameprops='password'
				typeprops='password'
				placeholderprops='*******'
			/>
			<Button classnameprops='bg-blue-600 w-full'>Login</Button>
		</form>
	);
};
export default FormLogin;
