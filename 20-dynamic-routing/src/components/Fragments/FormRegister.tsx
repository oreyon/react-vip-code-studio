import Button from '../Elements/Button/Button';
import InputForm from '../Elements/Input';

const FormRegister = () => {
	return (
		<form action=''>
			<InputForm
				labelProps='Fullname'
				nameProps='fullname'
				typeProps='text'
				placeholderProps='John Doe'
			/>
			<InputForm
				labelProps='Email'
				nameProps='email'
				typeProps='email'
				placeholderProps='example@mail.com'
			/>
			<InputForm
				labelProps='Password'
				nameProps='password'
				typeProps='password'
				placeholderProps='*******'
			/>
			<InputForm
				labelProps='Confirm Password'
				nameProps='confirm-password'
				typeProps='password'
				placeholderProps='*******'
			/>
			<Button classNameProps='bg-blue-600 w-full'>Register</Button>
		</form>
	);
};
export default FormRegister;
