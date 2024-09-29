import React from 'react';
import Button from './components/Elements/Button/Button';

class ButtonClass extends React.Component {
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

export default function App() {
	return (
		<>
			<div className='flex justify-center items-center bg-slate-900 min-h-screen gap-x-3'>
				{/* <h1 className=''>Component Props</h1> */}
				<ButtonClass />
				<ButtonBlack />
				<Button bgcolor='bg-blue-600'>Login</Button>
				<Button bgcolor='bg-red-600'>Logout</Button>
				<Button>Tidak Ada</Button>
			</div>
		</>
	);
}
