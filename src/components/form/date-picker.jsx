import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { useController } from 'react-hook-form';

/**
 * @param {import("@mui/x-date-pickers/DatePicker").DatePickerProps & import("react-hook-form").UseControllerProps} props
 */
export const DatePicker = (props) => {
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
	console.log(error);

	return (
		<MuiDatePicker
			{...field}
			{...textFieldProps}
			disablePast
			slotProps={{ textField: { helperText: error?.message, error: Boolean(error) } }}
		/>
	);
};
