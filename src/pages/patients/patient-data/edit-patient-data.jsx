import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { DatePicker, Form, TextInput } from '@/components/form';
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
	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Paciente: {patientInVIew?.nombre} {patientInVIew?.apellido}
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				Datos requeridos
			</Typography>
			<Form
				onSubmit={console.info}
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
						Guardar
					</Button>
				</Stack>
			</Form>
		</Drawer>
	);
};
