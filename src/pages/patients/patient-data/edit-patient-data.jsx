import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { DatePicker, Form, TextInput } from '@/components/form';
import { updateProfile } from '@/services/profiles';
import { usePatientsContext } from '../context/patient.content';

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
	const { patientInVIew } = usePatientsContext();

	const handleSubmit = async (data) => {
		const updatedPatientData = {
			nombre: data.nombre,
			apellido: data.apellido,
			cedula: data.cedula,
			celular: data.celular,
			direccion: data.direccion,
			email: data.email,
			nacimiento: data.nacimiento,
		};
		const response = await updateProfile(patientInVIew.perfil.id, updatedPatientData);
		if (response) {
			onClose();
		}
	};
	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Paciente: {patientInVIew?.nombre} {patientInVIew?.apellido}
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				Datos requeridos
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					nombre: patientInVIew?.nombre,
					apellido: patientInVIew?.apellido,
					cedula: patientInVIew?.cedula,
					celular: patientInVIew?.celular,
					direccion: patientInVIew?.direccion,
					email: patientInVIew?.email,
					nacimiento: null,
				}}
			>
				<Stack spacing={3}>
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
		</Drawer>
	);
};
