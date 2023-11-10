import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, DatePicker, Form, TextInput, TimePicker } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { useProfessionals } from '@/hooks/use-professionals';
import { useNewShift } from '../hooks/use-new-shift';

export const Component = () => {
	const { data: patients } = usePatients();
	const { data: professionals } = useProfessionals();
	const {
		state: { shift },
	} = useLocation();
	const { mutate, isSuccess } = useNewShift();
	const navigate = useNavigate();

	const handleSubmit = (formdata) => {
		const time = dayjs(formdata.time);
		const date = dayjs(formdata.date)
			.set('hour', time.hour())
			.set('minute', time.minute())
			.set('second', time.second());
		mutate(
			{
				profesionalId: formdata.profesional.id,
				pacienteId: formdata.paciente.id,
				observacion: formdata.observacion,
				presentismo: formdata.presentismo,
				obraSocial: formdata.obraSocial,
				date: date.toISOString(),
			},
			{ onSuccess: () => setTimeout(() => navigate('..', { relative: 'path' }), 4_000) }
		);
	};

	return (
		<>
			<Helmet>
				<title>Nuevo sobreturno</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 3 }}>
					Nuevo sobreturno
				</Typography>
				<Typography variant="h6" component="h2" sx={{ mb: 3 }}>
					Datos requeridos
				</Typography>
				<Form
					defaultValues={{
						observacion: '',
						presentismo: '',
						paciente: null,
						time: null,
						date: dayjs(shift.date),
						profesional: null,
						obraSocial: '',
					}}
					onSubmit={handleSubmit}
				>
					<Stack spacing={4}>
						<Stack direction="row" spacing={4}>
							<TimePicker
								name="time"
								slotProps={{ textField: { variant: 'standard', label: 'Hora del turno' } }}
								sx={{ flex: '1' }}
								minTime={dayjs(shift.date).subtract(29, 'minutes')}
								maxTime={dayjs(shift.date).add(29, 'minutes')}
								minutesStep={5}
								closeOnSelect={false}
							/>
							<DatePicker
								name="date"
								slotProps={{ textField: { variant: 'standard', label: 'Fecha' } }}
								readOnly
								sx={{ flex: '1' }}
							/>
						</Stack>
						<Autocomplete
							name="paciente"
							options={patients ?? []}
							getOptionLabel={(opt) =>
								`${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`
							}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							inputProps={{
								variant: 'standard',
								label: 'Paciente',
								placeholder: 'Nombre del Paciente e email',
							}}
						/>
						<Autocomplete
							name="profesional"
							options={professionals ?? []}
							getOptionLabel={(opt) =>
								`${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`
							}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							inputProps={{
								variant: 'standard',
								label: 'Profesional',
								placeholder: 'Nombre del Paciente e email',
							}}
						/>

						<TextInput name="observacion" variant="standard" label="Observación" />
						<TextInput name="presentismo" variant="standard" label="Presentismo" />
						<TextInput
							name="obraSocial"
							variant="standard"
							label="Obra Social"
							rules={{ required: false }}
						/>
						<Button type="submit" variant="contained">
							Crear sobreturno
						</Button>
					</Stack>
				</Form>
				<Slide direction="up" in={isSuccess} mountOnEnter unmountOnExit>
					<Alert severity="success" sx={{ mt: 2 }}>
						Sobreturno creado con éxito!
					</Alert>
				</Slide>
			</Container>
		</>
	);
};
