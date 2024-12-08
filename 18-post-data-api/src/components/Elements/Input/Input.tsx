import { ForwardedRef, forwardRef } from 'react';

type InputProps = {
	typeProps: string;
	placeholderProps: string;
	nameProps: string;
	// refProps?: ForwardedRef<HTMLInputElement>;
	isPasswordField?: boolean;
	passwordVisible?: boolean;
	onTogglePassword?: () => void;
};

const Input = forwardRef(
	(
		{
			typeProps,
			placeholderProps,
			nameProps,
			isPasswordField = false,
			passwordVisible = false,
			onTogglePassword,
		}: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className='relative'>
				<input
					type={typeProps}
					name={nameProps}
					id={nameProps}
					className='text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50'
					placeholder={placeholderProps}
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
