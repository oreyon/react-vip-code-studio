import { ForwardedRef, forwardRef } from 'react';

type InputProps = {
	type: string;
	placeholder: string;
	name: string;
	// refProps?: ForwardedRef<HTMLInputElement>;
	isPasswordField?: boolean;
	passwordVisible?: boolean;
	onTogglePassword?: () => void;
};

const Input = forwardRef(
	(
		{
			type,
			placeholder,
			name,
			isPasswordField = false,
			passwordVisible = false,
			onTogglePassword,
		}: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className='relative'>
				<input
					type={type}
					name={name}
					id={name}
					className='text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50'
					placeholder={placeholder}
					ref={ref}
					// ref={refProps}
				/>
				{isPasswordField && (
					<button
						type='button'
						className='absolute right-3 top-2 text-gray-600'
						onClick={onTogglePassword}>
						{passwordVisible ? '🙈' : '👁️'}
					</button>
				)}
			</div>
		);
	}
);

export default Input;
