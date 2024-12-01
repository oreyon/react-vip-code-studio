import Input from './Input';
import Label from './Label';

type InputFormProps = {
	labelprops?: string;
	nameprops: string;
	typeprops: string;
	placeholderprops: string;
};

const InputForm = ({
	labelprops,
	nameprops,
	typeprops,
	placeholderprops,
}: InputFormProps) => {
	return (
		<div className='mb-6'>
			<Label htmlforprops={nameprops}>{labelprops}</Label>
			<Input
				nameprops={nameprops}
				typeprops={typeprops}
				placeholderprops={placeholderprops}
			/>
		</div>
	);
};
export default InputForm;
