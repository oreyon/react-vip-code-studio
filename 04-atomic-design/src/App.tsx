import React from 'react';

class Button extends React.Component {
	render() {
		return (
			<button
				className='h-10 px-6 font-semibold rounded-md bg-blue-600 text-white'
				type='submit'>
				Class Button
			</button>
		);
	}
}

function ButtonBlack() {
	return (
		<button
			className='h-10 px-6 font-semibold rounded-md bg-black text-white'
			type='submit'>
			Function Button
		</button>
	);
}

type ButtonRedProps = {
	bgcolor?: string;
	children?: React.ReactNode;
};

const ButtonRed = ({
	bgcolor = 'bg-black',
	children = '...',
}: ButtonRedProps) => {
	return (
		<button
			className={`h-10 px-6 font-semibold rounded-md ${bgcolor} text-white`}
			type='submit'>
			{children}
		</button>
	);
};

export default function App() {
	return (
		<>
			<div className='flex justify-center items-center bg-slate-900 min-h-screen gap-x-3'>
				{/* <h1 className=''>Component Props</h1> */}
				<Button />
				<ButtonBlack />
				<ButtonRed bgcolor='bg-blue-600'>Login</ButtonRed>
				<ButtonRed bgcolor='bg-red-600'>Logout</ButtonRed>
				<ButtonRed></ButtonRed>
			</div>
		</>
	);
}
