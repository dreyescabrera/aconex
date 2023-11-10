import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useEditProfile } from '@/hooks/use-edit-profile';
import { usePatientsContext } from '../context/patient.context';

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
export const EditPatientData = ({ open, onClose }) => {
	const { mutate, status, error } = useEditProfile({ queryKeyToInvalidate: ['patients'] });
	const { patientInVIew } = usePatientsContext();

	const handleSubmit = (data) => {
		mutate({ ...data, perfilId: patientInVIew?.perfilId });
	};
	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Paciente:
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1 }}>
				{patientInVIew?.perfil.nombre} {patientInVIew?.perfil.apellido}{' '}
			</Typography>
			<Typography variant="h6" component="p" sx={{ mb: 3 }}>
				{patientInVIew?.perfil.email}
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					nombre: patientInVIew?.perfil.nombre,
					apellido: patientInVIew?.perfil.apellido,
					cedula: patientInVIew?.perfil.cedula,
					celular: patientInVIew?.perfil.celular,
					direccion: patientInVIew?.perfil.direccion,
					email: patientInVIew?.perfil.email,
					nacimiento: dayjs(patientInVIew?.perfil.nacimiento),
				}}
			>
				<Stack spacing={3} sx={{ mb: 3 }}>
					<TextInput name="nombre" label="Nombre" required={false} />
					<TextInput name="apellido" label="Apellido" required={false} />
					<TextInput name="cedula" label="Número de Cédula" required={false} />
					<TextInput name="celular" label="Celular" required={false} />
					<TextInput name="direccion" label="Dirección" required={false} />
					<TextInput name="email" label="Correo electrónico" required={false} />
					<DatePicker
						name="nacimiento"
						label="Fecha de nacimiento"
						slotProps={{ textField: { variant: 'standard' } }}
						disableFuture
					/>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>

			{status === 'loading' && <Alert severity="info">Cargando...</Alert>}

			{status === 'error' && (
				// @ts-ignore
				<Alert severity="error">Error al editar paciente: {error.response.data.message}</Alert>
			)}

			{status === 'success' && <Alert severity="success">Paciente editado con éxito.</Alert>}
		</Drawer>
	);
};
