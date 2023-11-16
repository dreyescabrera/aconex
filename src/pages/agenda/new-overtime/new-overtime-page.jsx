import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, DatePicker, Form, TextInput, TimePicker } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { useProfessionals } from '@/hooks/use-professionals';
import { useNewShift } from '../hooks/use-new-shift';
import { useShifts } from '../hooks/use-shifts';

export const Component = () => {
	const {
		state: { shift },
	} = useLocation();
	const shiftDate = dayjs.utc(shift.date);
	const { data: allDayShifts } = useShifts({
		fechaDesde: shiftDate.format('MM/DD/YY'),
		fechaHasta: shiftDate.format('MM/DD/YY'),
	});
	const { data: patients } = usePatients();
	const { data: professionals } = useProfessionals();
	const { mutate, isSuccess, error } = useNewShift();
	const navigate = useNavigate();

	const unavailableMinutes = allDayShifts?.reduce((array, currentShift) => {
		const date = dayjs.utc(currentShift.date);
		if (date.hour() === shiftDate.hour()) {
			array.push(dayjs(currentShift.date).minute());
		}
		return array;
	}, []);

	const handleSubmit = (formdata) => {
		const hour = dayjs(formdata.hour);
		const minute = dayjs(formdata.minute);
		const date = dayjs.utc(formdata.date).set('hour', hour.hour()).set('minute', minute.minute());

		mutate(
			{
				profesionalId: formdata.profesional.id,
				pacienteId: formdata.paciente.id,
				observacion: formdata.observacion,
				presentismo: formdata.presentismo,
				obraSocial: formdata.obraSocial,
				date: date.toISOString(),
			},
			{ onSuccess: () => setTimeout(() => navigate(-1), 4_000) }
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
						date: dayjs.utc(shift.date),
						hour: dayjs.utc(shift.date),
						minute: null,
						profesional: null,
						obraSocial: '',
					}}
					onSubmit={handleSubmit}
				>
					<Stack spacing={4}>
						<Stack direction="row" spacing={4}>
							<DatePicker
								name="date"
								slotProps={{
									textField: { variant: 'standard', label: 'Fecha' },
									inputAdornment: { style: { display: 'none' } },
								}}
								readOnly
								sx={{ flex: '1' }}
							/>
							<TimePicker
								name="hour"
								slotProps={{
									textField: { variant: 'standard', label: 'Hora del turno' },
									inputAdornment: { style: { display: 'none' } },
								}}
								readOnly
								views={['hours']}
								view="hours"
							/>
							<TimePicker
								name="minute"
								slotProps={{ textField: { variant: 'standard', label: 'Minuto del turno' } }}
								minutesStep={5}
								views={['minutes']}
								view="minutes"
								shouldDisableTime={(value, view) => {
									return view === 'minutes' && unavailableMinutes.includes(value.minute());
								}}
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
				<Collapse in={isSuccess}>
					<Alert severity="success" sx={{ mt: 2 }}>
						Sobreturno creado con éxito!
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
