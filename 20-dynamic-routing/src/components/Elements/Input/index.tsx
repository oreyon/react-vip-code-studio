import { ForwardedRef, forwardRef } from 'react';
import Input from './Input';
import Label from './Label';

type InputFormProps = {
	label?: string;
	name: string;
	type: string;
	placeholder: string;
	onTogglePassword?: () => void;
	isPasswordField?: boolean;
	passwordVisible?: boolean;
	// refProps?: ForwardedRef<HTMLInputElement>;
};

// ForwardedRef<HTMLInputElement>

const InputForm = forwardRef(
	(
		{
			label,
			name,
			type,
			placeholder,
			onTogglePassword,
			isPasswordField = false,
			passwordVisible = false,
		}: InputFormProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		return (
			<div className='mb-6'>
				<Label htmlFor={name}>{label}</Label>
				<Input
					name={name}
					type={type}
					placeholder={placeholder}
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
