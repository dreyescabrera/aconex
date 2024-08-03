import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RightDrawer } from '@/components/drawers';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useCreatePatient } from '../hooks/use-create-patient';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */

export const NewPatient = ({ open, onClose }) => {
	const { mutate, status, error } = useCreatePatient();

	const handleSubmit = (formData) => {
		let datos = {};
		for (var key in formData) {
			if (formData[key] != null && formData[key] != '') {
				datos = { [key]: formData[key], ...datos };
			}
		}

		mutate(datos);
	};
	const handleError = (err) => {
		let messageError = err;
		if (err === 'Conflict') {
			messageError = 'Este correo ya esta registrado';
		}
		return messageError;
	};
	return (
		<RightDrawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Información del paciente
			</Typography>

			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					nombre: '',
					apellido: '',
					cedula: '',
					celular: '',
					direccion: '',
					email: '',
					nacimiento: null,
					CondIVA: '',
				}}
			>
				<Stack spacing={3} sx={{ mb: 3 }}>
					<TextInput name="nombre" label="Nombre" />
					<TextInput name="apellido" label="Apellido" />
					<TextInput name="cedula" label="Número de DNI o Pasaporte" rules={{ required: false }} />
					<TextInput name="celular" label="Celular" rules={{ required: false }} />
					<TextInput name="direccion" label="Dirección" rules={{ required: false }} />
					<TextInput name="email" label="Correo electrónico" rules={{ required: false }} />
					<DatePicker
						name="nacimiento"
						label="Fecha de nacimiento"
						slotProps={{ textField: { variant: 'standard' } }}
						disableFuture
						rules={{ required: false }}
					/>
					<TextInput name="CondIVA" label="Condición ante el IVA" rules={{ required: false }} />
					<Button type="submit" variant="contained">
						Crear
					</Button>
				</Stack>
			</Form>

			{status === 'loading' && <Alert severity="info">Cargando...</Alert>}

			{status === 'error' && (
				// @ts-ignore
				<Alert severity="error">
					Error al crear el paciente:{' '}
					{handleError(
						// @ts-ignore
						error.response.data.message
					)}
				</Alert>
			)}

			{status === 'success' && <Alert severity="success">Paciente creado con éxito.</Alert>}
		</RightDrawer>
	);
};
