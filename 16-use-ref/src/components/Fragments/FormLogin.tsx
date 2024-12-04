import Button from '../Elements/Button/Button';
import InputForm from '../Elements/Input';

const FormLogin = () => {
	const handleLogin = (event: React.BaseSyntheticEvent<Event>) => {
		event.preventDefault();

		/* 
		React.ormEvent<HTMLFormElement>
		cara memanggil: event.currentTarget.email.value
		jika ingin sama dengan tutorial maka perlu menggunakan cara ini,
		agar event dianggap sebagai elemen form
		*/

		// const form = event.target as HTMLFormElement;
		// console.log(form.email.value);

		/* 
		React.BaseSyntheticEvent<Event>
		cara memanggil: event.target.email.value
		Base Synthetic Event adalah event yang dihasilkan oleh React
		jadi tidak perlu tidak merlu mendefinisikan event.target sebagai HTMLFormElement
		*/

		// console.log(event.target.email.value);
		// console.log(event.target.password.value);

		// save email to localStorage
		localStorage.setItem('email', event.target.email.value);
		localStorage.setItem('password', event.target.password.value);

		// redirect to products
		window.location.href = '/products';
	};

	return (
		<form action='' onSubmit={handleLogin}>
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
			<Button typeProps='submit' classNameProps='bg-blue-600 w-full'>
				Login
			</Button>
		</form>
	);
};
export default FormLogin;
