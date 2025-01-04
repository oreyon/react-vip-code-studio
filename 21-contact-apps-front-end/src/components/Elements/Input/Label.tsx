type LabelProps = {
	htmlFor: string;
	children?: React.ReactNode;
};

const Label = (props: LabelProps) => {
	return (
		<label
			htmlFor={props.htmlFor}
			className='block text-slate-700 text-sm font-bold mb-2'>
			{props.children}
		</label>
	);
};
export default Label;
