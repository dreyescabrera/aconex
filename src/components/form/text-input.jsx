import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

/**
 * @param {import("@mui/material").TextFieldProps & import("react-hook-form").UseControllerProps} props
 */
export const TextInput = (props) => {
	const { name, control, defaultValue, rules, shouldUnregister, ...textFieldProps } = props;

	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		defaultValue,
		rules: { required: 'Este campo es requerido', ...rules },
		shouldUnregister,
	});

	return (
		<TextField
			error={Boolean(error)}
			helperText={error?.message}
			variant="standard"
			{...field}
			{...textFieldProps}
		/>
	);
};
