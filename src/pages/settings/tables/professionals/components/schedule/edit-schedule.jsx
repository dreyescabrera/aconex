import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Autocomplete, DatePicker, Form, TimePicker } from '@/components/form';
import { dayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';

const especialidades = ['Cirugia', 'Odontologia'];

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
export const EditSchedule = ({ open, onClose }) => {
	const { professionalInView } = useProfessionalsContext();

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Horarios disponible
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				{professionalInView?.nombre} {professionalInView?.apellido} - {professionalInView?.cedula}
			</Typography>
			<Form
				onSubmit={console.info}
				defaultValues={{
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
						options={professionalInView?.horarios}
						name="dia"
						getOptionLabel={(option) => dayList[option.nroDia]}
						isOptionEqualToValue={(option, value) => option.nroDia === value.nroDia}
						inputProps={{ label: 'Seleccionar día' }}
					/>
					<Autocomplete
						options={especialidades}
						name="especialidad"
						inputProps={{ label: 'Seleccionar especialidad' }}
					/>
					<Divider />
					<Stack direction="row" spacing={1}>
						<TimePicker name="horaDesde" label="Hora Desde" />
						<TimePicker name="horaHasta" label="Hora Hasta" />
					</Stack>
					<TimePicker name="intervalo" label="Intervalo" />
					<Stack direction="row" spacing={1}>
						<DatePicker name="fechaDesde" label="Fecha desde" />
						<DatePicker name="fechaHasta" label="Fecha hasta" rules={{ required: false }} />
					</Stack>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>
		</Drawer>
	);
};
