import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Autocomplete, DatePicker, Form, TimePicker } from '@/components/form';
import { dayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';
import { useEditschedule } from '../../hooks/use-edit-schedule';
import { useGetspecialties } from '../../hooks/use-get-specialties';

const dias = [1, 2, 3, 4, 5, 6, 7];

const Drawer = styled(MuiDrawer)(() => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		minWidth: '300px',
		maxWidth: '50vw',
	},
}));

const cuttimezone = (vigencia) => {
	//Recorta la zona horaria de la fecha de forma tal que dayjs no la modifique
	if (vigencia) {
		const tam1 = vigencia.length - 2;
		const fecha1 = vigencia.slice(0, tam1);

		return fecha1;
	}
	return undefined;
};

const createtimestring = (timestring) => {
	//Similar al anterior pero lo genera para las horas de las cuales solo se tiene "HH:mm"
	if (timestring) {
		const datestring = '2023-10-23T' + timestring;
		return datestring;
	}
	return undefined;
};

const createintervalstring = (intervalnumber) => {
	//Similar al anterior pero genera el dato del timepicker a traves de un entero que representa los minutos
	if (intervalnumber) {
		var intervalstring = intervalnumber.toString();
		if (intervalstring.length === 1) {
			intervalstring = '0' + intervalstring;
		}
		const datestring = '2023-11-07T00:' + intervalstring + ':00.00';
		return datestring;
	}

	return undefined;
};

const identifyspecialty = (specialtyId, specialties) => {
	//Identifica la especialidad a traves de un id
	var resultado = null;
	if (specialtyId && specialties) {
		const tam = specialties.length;
		var i = 0;
		while (i < tam) {
			if (specialtyId === specialties[i].id) {
				resultado = specialties[i];
				i = tam;
			}
			i = i + 1;
		}
	}

	return resultado;
};

const Mnjeditschedule = ({ status }) => {
	if (status.isLoading) {
		return (
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircularProgress /> <p>Cargando...</p>
			</Stack>
		);
	}
	if (status.isSuccess) {
		return <Alert severity="success">Horario editado con exito!</Alert>;
	}
	if (status.isError) {
		const errormensaje = status.error.response.data.message;
		return <Alert severity="error">Error al editar horario: {errormensaje}</Alert>;
	}
};

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EditSchedule = ({ open, onClose }) => {
	const { scheduleInView, professionalInView } = useProfessionalsContext();
	const mutation = useEditschedule();

	const especialidades = useGetspecialties();
	const handleSubmit = (ev) => {
		const profid = scheduleInView?.profesionalId.toString();
		const horarioid = scheduleInView?.id.toString();
		const urledit = '/horarios/' + profid + '/' + horarioid;
		var desde = ev.fechaDesde.format('MM/DD/YYYY');
		var hasta = ev.fechaHasta.format('MM/DD/YYYY');
		var hdesde = ev.horaDesde.format('HH:mm');
		var hhasta = ev.horaHasta.format('HH:mm');
		var interval = ev.intervalo.format('mm');
		const horariodata = {
			especialidadId: ev.especialidad.id,
			nroDia: ev.dia,
			vigenciaDesde: desde,
			vigenciaHasta: hasta,
			horaDesde: hdesde,
			horaHasta: hhasta,
			intervalo: interval,
		};
		const resultado = [urledit, horariodata];
		mutation.mutate(resultado);
	};

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
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
					especialidad: identifyspecialty(scheduleInView?.especialidadId, especialidades),
					horaDesde: dayjs(createtimestring(scheduleInView?.horaDesde)),
					horaHasta: dayjs(createtimestring(scheduleInView?.horaHasta)),
					intervalo: dayjs(createintervalstring(scheduleInView?.intervalo)),
					fechaDesde: dayjs(cuttimezone(scheduleInView?.vigenciaDesde)),
					fechaHasta: dayjs(cuttimezone(scheduleInView?.vigenciaHasta)),
				}}
			>
				<Stack spacing={3}>
					<Autocomplete
						options={dias}
						name="dia"
						getOptionLabel={(option) => dayList[option]}
						isOptionEqualToValue={(option, value) => option === value}
						inputProps={{ label: 'Seleccionar día', variant: 'standard' }}
					/>
					<Autocomplete
						options={especialidades}
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
			<Container sx={{ mt: 2, mb: 1 }}>
				<Mnjeditschedule status={mutation} />
			</Container>
		</Drawer>
	);
};
