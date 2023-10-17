import MuiAutocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

/**
 * @typedef {object} CustomProps
 * @property {import("@mui/material/TextField").TextFieldProps} [inputProps={}]
 */

/**
 * @param {Omit<import("@mui/material/Autocomplete").AutocompleteProps, "renderInput"> & import("react-hook-form").UseControllerProps & CustomProps} props
 */
export const Autocomplete = (props) => {
	const { name, control, defaultValue, rules, shouldUnregister, inputProps, ...autocompleteProps } =
		props;
	inputProps;
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
		<MuiAutocomplete
			renderInput={(params) => (
				<TextField {...params} {...inputProps} error={Boolean(error)} helperText={error?.message} />
			)}
			{...field}
			{...autocompleteProps}
			onChange={(_, data) => field.onChange(data)}
		/>
	);
};
