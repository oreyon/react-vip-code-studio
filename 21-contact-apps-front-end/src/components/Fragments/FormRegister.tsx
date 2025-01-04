import Button from '../Elements/Button/Button';
import InputForm from '../Elements/Input';

const FormRegister = () => {
	return (
		<form action=''>
			<InputForm
				label='Fullname'
				name='fullname'
				type='text'
				placeholder='John Doe'
			/>
			<InputForm
				label='Email'
				name='email'
				type='email'
				placeholder='example@mail.com'
			/>
			<InputForm
				label='Password'
				name='password'
				type='password'
				placeholder='*******'
			/>
			<InputForm
				label='Confirm Password'
				name='confirm-password'
				type='password'
				placeholder='*******'
			/>
			<Button className='bg-blue-600 w-full'>Register</Button>
		</form>
	);
};
export default FormRegister;
