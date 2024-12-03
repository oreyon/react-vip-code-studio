type InputProps = {
	typeProps: string;
	placeholderProps: string;
	nameProps: string;
};

const Input = ({ typeProps, placeholderProps, nameProps }: InputProps) => {
	return (
		<input
			type={typeProps}
			name={nameProps}
			id={nameProps}
			className='text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder: opacity-50'
			placeholder={placeholderProps}
		/>
	);
};
export default Input;
