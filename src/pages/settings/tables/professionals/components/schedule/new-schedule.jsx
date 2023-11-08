import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { Autocomplete, DatePicker, Form, TimePicker } from '@/components/form';
import { useSpecialties } from '@/hooks/use-specialties';
import { api } from '@/services/api';
import { dayJsDayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';

const Mensajenewschedule = ({ status }) => {
	if (status.isLoading) {
		return (
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircularProgress /> <p>Cargando...</p>
			</Stack>
		);
	}
	if (status.isSuccess) {
		return <Alert severity="success">Horario agregado con exito!</Alert>;
	}
	if (status.isError) {
		const errormensaje = status.error.response.data.message;
		return <Alert severity="error">Error al agregar Horario: {errormensaje}</Alert>;
	}
};

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
 * @param {object} props.professionalslist
 */
export const NewSchedule = ({ open, onClose, professionalslist }) => {
	const { data: specialties } = useSpecialties();
	const { refetch } = useProfessionalsContext();

	async function setschedule(schedule) {
		const res = await api.post('/horarios', schedule).then(() => refetch());
		return res;
	}

	const mutation = useMutation(setschedule);

	const handleSubmit = (ev) => {
		var desde = ev.fechaDesde.format('MM/DD/YYYY');
		var hasta = ev.fechaHasta.format('MM/DD/YYYY');
		var hdesde = ev.horaDesde.format('HH:mm');
		var hhasta = ev.horaHasta.format('HH:mm');
		var interval = ev.intervalo.format('mm');
		let horario = {
			profesionalId: ev.profesional.id,
			especialidadId: ev.especialidad.id,
			clinicaId: 1, //Es Necesario especificar la clinica
			nroDia: ev.dia,
			vigenciaDesde: desde,
			vigenciaHasta: hasta,
			horaDesde: hdesde,
			horaHasta: hhasta,
			intervalo: interval,
		};

		mutation.mutate(horario);
	};

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
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
					intervalo: null,
					fechaDesde: null,
					fechaHasta: null,
				}}
			>
				<Stack spacing={3}>
					<Autocomplete
						options={professionalslist}
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
						options={specialties}
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
				<Mensajenewschedule status={mutation} />
			</Container>
		</Drawer>
	);
};
