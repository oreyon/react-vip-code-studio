type LabelProps = {
	htmlforprops: string;
	children?: React.ReactNode;
};

const Label = (props: LabelProps) => {
	return (
		<label
			htmlFor={props.htmlforprops}
			className='block text-slate-700 text-sm font-bold mb-2'>
			{props.children}
		</label>
	);
};
export default Label;
