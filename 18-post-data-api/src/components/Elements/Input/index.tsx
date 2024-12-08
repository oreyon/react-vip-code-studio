import { ForwardedRef, forwardRef } from 'react';
import Input from './Input';
import Label from './Label';

type InputFormProps = {
	labelProps?: string;
	nameProps: string;
	typeProps: string;
	placeholderProps: string;
	onTogglePassword?: () => void;
	isPasswordField?: boolean;
	passwordVisible?: boolean;
	// refProps?: ForwardedRef<HTMLInputElement>;
};

// ForwardedRef<HTMLInputElement>

const InputForm = forwardRef(
	(
		{
			labelProps,
			nameProps,
			typeProps,
			placeholderProps,
			onTogglePassword,
			isPasswordField = false,
			passwordVisible = false,
		}: InputFormProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className='mb-6'>
				<Label htmlforProps={nameProps}>{labelProps}</Label>
				<Input
					nameProps={nameProps}
					typeProps={typeProps}
					placeholderProps={placeholderProps}
					// refProps={refProps}
					ref={ref}
					isPasswordField={isPasswordField}
					passwordVisible={passwordVisible}
					onTogglePassword={onTogglePassword}
				/>
			</div>
		);
	}
);

export default InputForm;
