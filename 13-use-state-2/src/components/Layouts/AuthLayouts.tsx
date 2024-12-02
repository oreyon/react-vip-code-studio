import { Link } from 'react-router-dom';

type AuthLayoutsProps = {
	titleProps: string;
	typeProps: string;
	children?: React.ReactNode;
};

const AuthLayouts = ({ titleProps, typeProps, children }: AuthLayoutsProps) => {
	return (
		<div className='w-full max-w-xs'>
			<h1 className='text-blue-600 text-3xl font-bold mb-2'>{titleProps}</h1>
			<p className='font-medium text-slate-500 mb-8'>
				Welcome, please enter your details
			</p>
			{children}
			{/* cara 1: directly write logic */}
			{/* <p className='text-sm mt-5 text-center'>
				{typeprops === `login`
					? `Don't have an account?`
					: `Already have an account?`}{' '}
				{typeprops === `login` && (
					<Link to='/register' className='text-blue-600'>
						Register
					</Link>
				)}
				{typeprops === `register` && (
					<Link to='/login' className='text-blue-600'>
						Login
					</Link>
				)}
			</p> */}
			{/* cara 2: pass on another component */}
			<Navigation typeProps={typeProps} />
		</div>
	);
};

type NavigationProps = {
	typeProps: string;
};

export const Navigation = ({ typeProps }: NavigationProps) => {
	if (typeProps === `login`) {
		return (
			<p className='text-sm mt-5 text-center'>
				Don't have an account?{' '}
				<Link to='/register' className='text-blue-600'>
					Register
				</Link>
			</p>
		);
	} else {
		return (
			<p className='text-sm mt-5 text-center'>
				Already have an account?{' '}
				<Link to='/login' className='text-blue-600'>
					Login
				</Link>
			</p>
		);
	}
};

export default AuthLayouts;
