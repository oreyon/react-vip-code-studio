import { ForwardedRef, forwardRef } from 'react';

type InputProps = {
	typeProps: string;
	placeholderProps: string;
	nameProps: string;
	// refProps?: ForwardedRef<HTMLInputElement>;
};

const Input = forwardRef(
	(
		{ typeProps, placeholderProps, nameProps }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<input
				type={typeProps}
				name={nameProps}
				id={nameProps}
				className='text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50'
				placeholder={placeholderProps}
				ref={ref}
				// ref={refProps}
			/>
		);
	}
);

export default Input;
