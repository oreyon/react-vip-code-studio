import Button from '../Elements/Button/Button';
import InputForm from '../Elements/Input';

const FormRegister = () => {
	return (
		<form action=''>
			<InputForm
				labelprops='Fullname'
				nameprops='fullname'
				typeprops='text'
				placeholderprops='John Doe'
			/>
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
			<InputForm
				labelprops='Confirm Password'
				nameprops='confirm-password'
				typeprops='password'
				placeholderprops='*******'
			/>
			<Button classnameprops='bg-blue-600 w-full'>Register</Button>
		</form>
	);
};
export default FormRegister;
