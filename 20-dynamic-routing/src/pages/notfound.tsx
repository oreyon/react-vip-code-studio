import { Link, useNavigate, useRouteError } from 'react-router-dom';
import Button from '../components/Elements/Button/Button';

const NotFound = () => {
	const error = useRouteError() as { status?: number; message?: string };
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	//<p className='text-lg'>{error.status || error.message}</p>

	return (
		<main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<p className='text-base font-semibold text-indigo-600'>
					Oops! Something went wrong
				</p>
				<h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
					{error.status || error.message}
				</h1>
				<p className='mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
					We can't seem to find the page you're looking for.
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<Button
						onClick={handleGoBack}
						className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Go Back
					</Button>
					<Link
						to='/products'
						className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Dashboard
					</Link>
					<a href='#' className='text-sm font-semibold text-gray-900'>
						Contact support <span aria-hidden='true'>&rarr;</span>
					</a>
				</div>
			</div>
		</main>
	);
};
export default NotFound;
