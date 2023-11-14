import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RightDrawer } from '@/components/drawers';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useCreateProfessional } from '../../hooks/use-create-professional';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const NewProfessionalData = ({ open, onClose }) => {
	const { mutate, status } = useCreateProfessional();

	const handleSubmit = (formData) => {
		const cellphone = parseInt(formData.celular);
		const ced = parseInt(formData.cedula);
		const birthday = formData.nacimiento.format('MM/DD/YYYY');
		const data = {
			nombre: formData.nombre,
			apellido: formData.apellido,
			cedula: ced,
			celular: cellphone,
			direccion: formData.direccion,
			email: formData.email,
			nacimiento: birthday,
		};

		mutate(data);
	};

	return (
		<RightDrawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Información personal
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
				<Stack spacing={3} sx={{ mb: 2 }}>
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
						format="DD/MM/YYYY"
					/>
					<Button type="submit" variant="contained">
						Crear
					</Button>
				</Stack>
			</Form>

			{status === 'loading' && (
				<Stack direction="row" alignItems="center" spacing={1}>
					<CircularProgress />
				</Stack>
			)}

			{status === 'error' && (
				<Alert severity="error">
					Hubo un problema creando el profesional. Por favor, intente de nuevo.
				</Alert>
			)}

			{status === 'success' && (
				<Alert severity="success">El profesional fue creado exitosamente.</Alert>
			)}
		</RightDrawer>
	);
};
