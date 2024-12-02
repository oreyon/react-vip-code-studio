type InputProps = {
	typeprops: string;
	placeholderprops: string;
	nameprops: string;
};

const Input = ({ typeprops, placeholderprops, nameprops }: InputProps) => {
	return (
		<input
			type={typeprops}
			name={nameprops}
			id={nameprops}
			className='text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder: opacity-50'
			placeholder={placeholderprops}
		/>
	);
};
export default Input;
