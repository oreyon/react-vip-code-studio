import React from 'react';

type ButtonProps = {
	classnameprops?: string;
	children?: React.ReactNode;
};

const Button = ({
	classnameprops = 'bg-black',
	children = '...',
}: ButtonProps) => {
	return (
		<button
			className={`h-10 px-6 font-semibold rounded-md ${classnameprops} text-white`}
			type='submit'>
			{children}
		</button>
	);
};

export default Button;
