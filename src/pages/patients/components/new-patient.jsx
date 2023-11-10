import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useCreatePatient } from '../hooks/use-create-patient';

const Drawer = styled(MuiDrawer)(() => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		minWidth: '300px',
		maxWidth: '50vw',
	},
}));

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */

export const NewPatient = ({ open, onClose }) => {
	const { mutate, status, error } = useCreatePatient();

	const handleSubmit = (formData) => {
		mutate(formData);
	};

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
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
				}}
			>
				<Stack spacing={3} sx={{ mb: 3 }}>
					<TextInput name="nombre" label="Nombre" />
					<TextInput name="apellido" label="Apellido" />
					<TextInput name="cedula" label="Número de Cédula" />
					<TextInput name="celular" label="Celular" />
					<TextInput name="direccion" label="Dirección" />
					<TextInput name="email" label="Correo electrónico" />
					<DatePicker
						name="nacimiento"
						label="Fecha de nacimiento"
						slotProps={{ textField: { variant: 'standard' } }}
						disableFuture
					/>
					<Button type="submit" variant="contained">
						Crear
					</Button>
				</Stack>
			</Form>

			{status === 'loading' && <Alert severity="info">Cargando...</Alert>}

			{status === 'error' && (
				// @ts-ignore
				<Alert severity="error">Error al crear el paciente: {error.response.data.message}</Alert>
			)}

			{status === 'success' && <Alert severity="success">Paciente creado con éxito.</Alert>}
		</Drawer>
	);
};
