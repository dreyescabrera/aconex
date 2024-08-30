import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { RightDrawer } from '@/components/drawers';
import { Autocomplete, DatePicker, Form, TimePicker } from '@/components/form';
import { useSpecialties } from '@/hooks/use-specialties';
import { dayJsDayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';
import { useEditSchedule } from '../../hooks/use-edit-schedule';

const cutTimezone = (vigencia) => {
	//Recorta la zona horaria de la fecha de forma tal que dayjs no la modifique
	if (vigencia) {
		const tam1 = vigencia.length - 2;
		const fecha1 = vigencia.slice(0, tam1);

		return fecha1;
	}
};

const createTimeString = (timeString) => {
	//Similar al anterior pero lo genera para las horas de las cuales solo se tiene "HH:mm"
	if (timeString) {
		const dateString = '2023-10-23T' + timeString;
		return dateString;
	}
};

const createIntervalString = (intervalNumber) => {
	//Similar al anterior pero genera el dato del timepicker a traves de un entero que representa los minutos
	if (intervalNumber) {
		var intervalString = intervalNumber.toString();
		if (intervalString.length === 1) {
			intervalString = '0' + intervalString;
		}
		const dateString = '2023-11-07T00:' + intervalString + ':00.00';
		return dateString;
	}
};

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EditSchedule = ({ open, onClose }) => {
	const [messageError, setMessageError] = useState(null);
	const { scheduleInView, professionalInView } = useProfessionalsContext();
	const { data: specialties } = useSpecialties();
	const { mutate, status, error, reset } = useEditSchedule();

	useEffect(() => {
		if (status === 'success') {
			let timer = setTimeout(() => {
				onClose();
			}, 2000);
			return () => clearInterval(timer);
		}
		return;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	const handleSubmit = (formData) => {
		const dateFrom = formData.fechaDesde.format('MM/DD/YYYY');
		const dateTo = formData.fechaHasta.format('MM/DD/YYYY');
		const hourFrom = formData.horaDesde.format('HH:mm');
		const hourTo = formData.horaHasta.format('HH:mm');
		const intervalo = formData.intervalo.format('mm');
		const especialidadId = formData.especialidad.id;
		const dayNumber = formData.dia;
		if (dateFrom <= dateTo) {
			setMessageError(null);
			mutate({
				profesionalId: scheduleInView.profesionalId,
				horarioId: scheduleInView.id,
				horaDesde: hourFrom,
				horaHasta: hourTo,
				vigenciaDesde: dateFrom,
				vigenciaHasta: dateTo,
				especialidadId,
				intervalo,
				nroDia: dayNumber,
			});
		} else {
			setMessageError('La fecha hasta no puede ser menor a fecha desde');
		}
	};

	const initialSpecialty = specialties?.find(
		(specialty) => specialty.id === scheduleInView?.especialidadId
	);
	useEffect(() => {
		if (!open) {
			reset();
			setMessageError(null);
		}
	}, [open, reset]);
	return (
		<RightDrawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Horarios disponible
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				{professionalInView?.perfil.nombre} {professionalInView?.perfil.apellido} -{' '}
				{professionalInView?.perfil.cedula}
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					dia: scheduleInView?.nroDia,
					especialidad: initialSpecialty,
					horaDesde: dayjs(createTimeString(scheduleInView?.horaDesde)),
					horaHasta: dayjs(createTimeString(scheduleInView?.horaHasta)),
					intervalo: dayjs(createIntervalString(scheduleInView?.intervalo)),
					fechaDesde: dayjs(cutTimezone(scheduleInView?.vigenciaDesde)),
					fechaHasta: dayjs(cutTimezone(scheduleInView?.vigenciaHasta)),
				}}
			>
				<Stack spacing={3}>
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
					<Divider />
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
						label="Intervalo"
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
							label="Fecha hasta"
							rules={{ required: false }}
							slotProps={{ textField: { variant: 'standard' } }}
							format="DD/MM/YYYY"
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>

			{status === 'loading' && (
				<Stack direction="row" alignItems="center" spacing={1}>
					<CircularProgress /> <p>Cargando...</p>
				</Stack>
			)}

			{status === 'error' && (
				// @ts-ignore
				<Alert severity="error">Error al editar horario: {error.response.data.message}</Alert>
			)}

			{status === 'success' && <Alert severity="success">Horario editado con éxito!</Alert>}

			{messageError && <Alert severity="error"> {messageError} </Alert>}
		</RightDrawer>
	);
};
