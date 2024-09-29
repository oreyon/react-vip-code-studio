import React from 'react';

type ButtonProps = {
	bgcolor?: string;
	children?: React.ReactNode;
};

const Button = ({ bgcolor = 'bg-black', children = '...' }: ButtonProps) => {
	return (
		<button
			className={`h-10 px-6 font-semibold rounded-md ${bgcolor} text-white`}
			type='submit'>
			{children}
		</button>
	);
};

export default Button;
