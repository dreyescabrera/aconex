import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

/**
 * @param {import("@mui/material").TextFieldProps & import("react-hook-form").UseControllerProps} props
 */
export const TextInputMinute = (props) => {
	const { name, control, defaultValue, rules, shouldUnregister, ...textFieldProps } = props;

	// Obtener los datos del campo y el estado de error de useController
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		defaultValue,
		rules: {
			required: 'Este campo es requerido',
			validate: (value) => {
				const number = Number(value);
				return (number >= 0 && number <= 59) || 'El valor debe estar entre 0 y 59';
			},
			...rules,
		},
		shouldUnregister,
	});

	// Manejo del cambio en el campo
	const handleChange = (event) => {
		const value = event.target.value;
		// Validar que solo se ingresen números y estén dentro del rango permitido
		if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) <= 59) {
			field.onChange(value); // Actualizar el valor en react-hook-form
		}
	};

	return (
		<TextField
			{...field} // Mantener los controladores del formulario
			error={Boolean(error)}
			helperText={error?.message}
			variant="standard"
			value={field.value} // Asegurar que el valor es controlado por react-hook-form
			onChange={handleChange} // Usar la función personalizada de manejo de cambios
			inputProps={{
				inputMode: 'numeric',
				pattern: '[0-9]*',
				maxLength: 2,
				...textFieldProps.inputProps, // Pasar otras props que le agregues
			}}
			{...textFieldProps} // Incluir otras props pasadas al componente
		/>
	);
};
