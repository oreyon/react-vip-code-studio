import React from 'react';

class Counter extends React.Component {
	state = {
		count: 0,
	};

	handleClick = () => {
		this.setState({
			count: this.state.count + 1,
		});
	};

	render() {
		return (
			<div className='flex items-center'>
				<h1 className='mr-5'>{this.state.count}</h1>
				<button onClick={this.handleClick} className='bg-black text-white p-3'>
					Increment
				</button>
			</div>
		);
	}
}

export default Counter;
