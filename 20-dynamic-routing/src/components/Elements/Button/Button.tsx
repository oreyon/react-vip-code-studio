import React from 'react';

type ButtonProps = {
	className?: string;
	onClick?: () => void;
	typeProps?: 'button' | 'submit' | 'reset';
	children?: React.ReactNode;
};

const Button = ({
	className = 'bg-black',
	onClick,
	children = '...',
	typeProps = 'button',
}: ButtonProps) => {
	return (
		<button
			className={`h-10 px-6 font-semibold rounded-md ${className} text-white`}
			// className={`rounded-md px-4 py-2 font-medium text-white ${classNameProps}`}
			type={typeProps}
			onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
