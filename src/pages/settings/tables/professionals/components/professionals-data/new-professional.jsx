import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { RightDrawer } from '@/components/drawers';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useCreateProfessional } from '../../hooks/use-create-professional';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const NewProfessionalData = ({ open, onClose }) => {
	const [currentStatus, setCurrentStatus] = useState('idle');
	const { mutate, status } = useCreateProfessional(setCurrentStatus);

	const handleSubmit = (formData) => {
		let datos = {};
		for (var key in formData) {
			if (formData[key] != null && formData[key] != '') {
				datos = { [key]: formData[key], ...datos };
			}
		}

		if (datos.celular) {
			datos.celular = Number(datos.celular);
		}

		if (datos.cedula) {
			datos.cedula = Number(datos.cedula);
		}

		if (datos.nacimiento) {
			datos.nacimiento = datos.nacimiento.format('MM/DD/YYYY');
		}

		mutate(datos);
	};
	useEffect(() => {
		if (status === 'success') {
			const timer = setTimeout(() => {
				setCurrentStatus('idle');
				onClose();
			}, 2000);
			return () => clearInterval(timer);
		}
		return;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);
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
					matricula: '',
				}}
			>
				<Stack spacing={3} sx={{ mb: 2 }}>
					<TextInput name="nombre" label="Nombre" />
					<TextInput name="apellido" label="Apellido" rules={{ required: false }} />
					<TextInput name="cedula" label="Número de DNI o Pasaporte" rules={{ required: false }} />
					<TextInput name="celular" label="Celular" rules={{ required: false }} />
					<TextInput name="direccion" label="Dirección" rules={{ required: false }} />
					<TextInput name="email" label="Correo electrónico" rules={{ required: false }} />
					<DatePicker
						name="nacimiento"
						label="Fecha de nacimiento"
						slotProps={{ textField: { variant: 'standard' } }}
						disableFuture
						format="DD/MM/YYYY"
						rules={{ required: false }}
					/>
					<TextInput name="matricula" label="Matrícula" />
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

			{currentStatus === 'error' && (
				<Alert severity="error">
					Hubo un problema creando el profesional. Por favor, intente de nuevo.
				</Alert>
			)}

			{currentStatus === 'success' && (
				<Alert severity="success">El profesional fue creado exitosamente.</Alert>
			)}
		</RightDrawer>
	);
};
