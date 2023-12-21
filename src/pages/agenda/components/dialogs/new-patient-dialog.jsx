import { useCreatePatient } from '@/pages/patients/hooks/use-create-patient';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { DatePicker, Form, TextInput } from '@/components/form';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const NewPatientDialog = ({ open, onClose }) => {
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
	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>{`Crear Paciente`}</DialogTitle>
			<DialogContent dividers>
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
						<TextInput name="apellido" label="Apellido" rules={{ required: false }} />
						<TextInput
							name="cedula"
							label="Número de DNI o Pasaporte"
							rules={{ required: false }}
						/>
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
					<Alert severity="error">Error al crear el paciente: {error.response.data.message}</Alert>
				)}

				{status === 'success' && <Alert severity="success">Paciente creado con éxito.</Alert>}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cerrar</Button>
			</DialogActions>
		</Dialog>
	);
};
