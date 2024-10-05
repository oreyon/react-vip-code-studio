type AuthLayoutsProps = {
	titleprops: string;
	children?: React.ReactNode;
};

const AuthLayouts = ({ titleprops, children }: AuthLayoutsProps) => {
	return (
		<div className='w-full max-w-xs'>
			<h1 className='text-blue-600 text-3xl font-bold mb-2'>{titleprops}</h1>
			<p className='font-medium text-slate-500 mb-8'>
				Welcome, please enter your details
			</p>

			{children}
		</div>
	);
};
export default AuthLayouts;
