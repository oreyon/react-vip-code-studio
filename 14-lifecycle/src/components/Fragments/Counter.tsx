import React from 'react';

type CounterProps = {
	initialCount?: number; // Example property
};

type CounterState = {
	count: number; // Example state
};

class Counter extends React.Component<CounterProps, CounterState> {
	constructor(props: CounterProps) {
		super(props);
		this.state = {
			count: 0,
		};

		console.log('Constructor called');
	}

	componentDidMount(): void {
		this.setState({ count: 1 });
		console.log('Counter component mounted');
	}

	componentDidUpdate(): void {
		if (this.state.count === 10) {
			this.setState({ count: 5 });
		}
		console.log('Counter component updated');
	}

	render() {
		console.log('Counter component rendered');

		return (
			<div className='flex items-center'>
				<h1 className='mr-5'>{this.state.count}</h1>
				<button
					onClick={() => this.setState({ count: this.state.count + 1 })}
					className='bg-black text-white p-3'>
					Increment
				</button>
			</div>
		);
	}
}

export default Counter;
