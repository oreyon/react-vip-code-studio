import React from 'react';

type ButtonProps = {
	classNameProps?: string;
	onClick?: () => void;
	typeProps?: 'button' | 'submit' | 'reset';
	children?: React.ReactNode;
};

const Button = ({
	classNameProps = 'bg-black',
	children = '...',
	typeProps = 'button',
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={`h-10 px-6 font-semibold rounded-md ${classNameProps} text-white`}
			type={typeProps}
			onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
