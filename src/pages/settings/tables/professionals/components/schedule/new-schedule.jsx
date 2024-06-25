import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { RightDrawer } from '@/components/drawers';
import { Autocomplete, DatePicker, Form, TimePicker } from '@/components/form';
import { useProfessionals } from '@/hooks/use-professionals';
import { useSpecialties } from '@/hooks/use-specialties';
import { dayJsDayList } from '@/constants/day-list';
import { useCreateSchedule } from '../../hooks/use-create-schedule';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const NewSchedule = ({ open, onClose }) => {
	const { data: professionals } = useProfessionals();
	const { data: specialties } = useSpecialties();
	const { mutate, status, error } = useCreateSchedule();

	const handleSubmit = (formData) => {
		const dateFrom = formData.fechaDesde.format('MM/DD/YYYY');
		const dateTo = formData.fechaHasta?.format('MM/DD/YYYY') || formData.fechaDesde.add(2, 'year');
		const hourFrom = formData.horaDesde.format('HH:mm');
		const hourTo = formData.horaHasta.format('HH:mm');
		const interval = formData.intervalo.format('mm');

		mutate({
			profesionalId: formData.profesional.id,
			especialidadId: formData.especialidad.id,
			nroDia: formData.dia,
			vigenciaDesde: dateFrom,
			vigenciaHasta: dateTo,
			horaDesde: hourFrom,
			horaHasta: hourTo,
			intervalo: interval,
		});
	};

	return (
		<RightDrawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2" sx={{ mb: 3 }}>
				Horarios disponible
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					profesional: null,
					dia: null,
					especialidad: null,
					horaDesde: null,
					horaHasta: null,
					intervalo: dayjs(new Date(0, 0, 0, 0, 30)),
					fechaDesde: null,
					fechaHasta: null,
				}}
			>
				<Stack spacing={3} sx={{ mb: 3 }}>
					<Autocomplete
						options={professionals ?? []}
						getOptionLabel={(option) =>
							typeof option !== 'string'
								? `${option.perfil.nombre} ${option.perfil.apellido}`
								: option
						}
						isOptionEqualToValue={(option, value) => option.perfil.email === value.perfil.email}
						name="profesional"
						inputProps={{ label: 'Profesional', variant: 'standard' }}
					/>
					<Autocomplete
						options={Object.keys(dayJsDayList)}
						name="dia"
						getOptionLabel={(option) => dayJsDayList[option]}
						isOptionEqualToValue={(option, value) => option === value}
						inputProps={{ label: 'Seleccionar día', variant: 'standard' }}
					/>
					<Autocomplete
						options={specialties ?? []}
						name="especialidad"
						getOptionLabel={(option) => option.nombre}
						isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
						inputProps={{ label: 'Seleccionar especialidad', variant: 'standard' }}
					/>
					<Stack direction="row" spacing={1}>
						<TimePicker
							name="horaDesde"
							label="Hora Desde"
							slotProps={{ textField: { variant: 'standard' } }}
						/>
						<TimePicker
							name="horaHasta"
							label="Hora Hasta"
							slotProps={{ textField: { variant: 'standard' } }}
						/>
					</Stack>
					<TimePicker
						name="intervalo"
						label="Intervalo en minutos"
						slotProps={{ textField: { variant: 'standard' } }}
						views={['minutes']}
					/>
					<Stack direction="row" spacing={1}>
						<DatePicker
							name="fechaDesde"
							label="Fecha desde"
							slotProps={{ textField: { variant: 'standard' } }}
							format="DD/MM/YYYY"
						/>
						<DatePicker
							name="fechaHasta"
							label="Fecha hasta (Opcional)"
							rules={{ required: false }}
							slotProps={{
								textField: {
									variant: 'standard',
									helperText: 'Si no se especifica, se creará por dos (2) años.',
								},
							}}
							format="DD/MM/YYYY"
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>
			{/* @ts-ignore*/}
			<RequestStatusMessage status={status} errorMessage={error?.response?.data?.message} />
		</RightDrawer>
	);
};

function RequestStatusMessage({ status, errorMessage }) {
	if (status === ' loading') {
		return (
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircularProgress /> <p>Cargando...</p>
			</Stack>
		);
	}

	if (status === 'error') {
		return <Alert severity="error">Error al agregar Horario: {errorMessage}</Alert>;
	}

	if (status === 'success') {
		return <Alert severity="success">Horario agregado con éxito!</Alert>;
	}
}
