import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Form, TextInput } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { useEditShifts } from '../hooks/use-edit-shifts';

export const Component = () => {
	const { data: patients } = usePatients();
	const { mutate, isSuccess, error } = useEditShifts();
	const {
		state: { shift },
	} = useLocation();
	const navigate = useNavigate();

	const handleMutate = (newFields) => {
		let data = {
			shiftId: shift.id,
			pacienteId: newFields.paciente.id,
			profesionalId: shift.profesionalId,
		};

		for (var key in newFields) {
			if (
				key === 'obraSocial' ||
				key === 'observacion' ||
				key === 'presentismo' ||
				key === 'celular'
			) {
				if (newFields[key] != null && newFields[key] != '' && newFields[key] != ' ') {
					if (key === 'celular') {
						let numerito = Number(newFields[key]);
						data = { [key]: numerito, ...data };
					} else {
						data = { [key]: newFields[key], ...data };
					}
				}
			}
		}

		mutate(data, { onSuccess: () => setTimeout(() => navigate(-1), 4_000) });
	};

	return (
		<>
			<Helmet>
				<title>Editar turno</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 3 }}>
					Editar turno
				</Typography>
				<Typography
					variant="h5"
					textTransform="capitalize"
					fontWeight="bold"
					component="p"
					sx={{ mb: 3, mt: 1 }}
				>
					{dayjs(shift.date).format('MMMM DD | HH:mm')}
				</Typography>
				<Form
					defaultValues={{
						paciente: shift.paciente,
						observacion: shift.observacion,
						presentismo: shift.presentismo,
						obraSocial: shift.obraSocial,
						celular: shift.paciente.perfil.celular,
					}}
					onSubmit={handleMutate}
				>
					<Stack spacing={4}>
						<Autocomplete
							name="paciente"
							inputProps={{ variant: 'standard', label: 'Paciente' }}
							options={patients ?? []}
							getOptionLabel={(opt) =>
								`${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`
							}
							isOptionEqualToValue={(option, value) => option.id === value.id}
						/>
						<TextInput
							name="observacion"
							variant="standard"
							label="Observación"
							rules={{ required: false }}
						/>
						<TextInput
							name="presentismo"
							variant="standard"
							label="Presentismo"
							rules={{ required: false }}
						/>
						<TextInput
							name="celular"
							variant="standard"
							label="tel/celular"
							rules={{ required: false }}
						/>
						<TextInput
							name="obraSocial"
							variant="standard"
							label="Obra Social"
							rules={{ required: false }}
						/>
						<Button type="submit" variant="contained">
							Modificar turno
						</Button>
					</Stack>
				</Form>
				<Collapse in={isSuccess}>
					<Alert severity="success" sx={{ mt: 2 }}>
						Turno editado con éxito!
					</Alert>
				</Collapse>
				<Collapse in={Boolean(error)}>
					<Alert severity="error" sx={{ mt: 2 }}>
						{/* @ts-ignore */}
						Hubo un problema creando el sobreturno: {error?.response.data.message}
					</Alert>
				</Collapse>
			</Container>
		</>
	);
};
