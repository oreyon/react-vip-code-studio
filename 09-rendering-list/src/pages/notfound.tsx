import { useRouteError } from 'react-router-dom';

const NotFound = () => {
	const error = useRouteError() as { status?: number; message?: string };

	return (
		<div className='flex justify-center items-center min-h-screen gap-x-3 flex-col'>
			<h1 className='text-3xl font-bold'>Opps!</h1>
			<p className='my-5 text-xl'>Sory, an unexpected error has occured</p>
			<p className='text-lg'>{error.status || error.message}</p>
		</div>
	);
};
export default NotFound;
