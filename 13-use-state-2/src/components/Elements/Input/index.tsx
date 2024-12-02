import Input from './Input';
import Label from './Label';

type InputFormProps = {
	labelProps?: string;
	nameProps: string;
	typeProps: string;
	placeholderProps: string;
};

const InputForm = ({
	labelProps,
	nameProps,
	typeProps,
	placeholderProps,
}: InputFormProps) => {
	return (
		<div className='mb-6'>
			<Label htmlforProps={nameProps}>{labelProps}</Label>
			<Input
				nameProps={nameProps}
				typeProps={typeProps}
				placeholderProps={placeholderProps}
			/>
		</div>
	);
};
export default InputForm;
