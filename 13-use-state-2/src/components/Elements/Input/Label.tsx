type LabelProps = {
	htmlforProps: string;
	children?: React.ReactNode;
};

const Label = (props: LabelProps) => {
	return (
		<label
			htmlFor={props.htmlforProps}
			className='block text-slate-700 text-sm font-bold mb-2'>
			{props.children}
		</label>
	);
};
export default Label;
