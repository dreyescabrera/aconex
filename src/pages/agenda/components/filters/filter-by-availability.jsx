import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useAgendaContext } from '../../context/agenda.context';

export const FilterByAvailability = () => {
	const { updateFilters, filters } = useAgendaContext();

	const handleChange = (ev) => {
		const isChecked = ev.target.checked;
		updateFilters({ libres: isChecked || undefined }); // undefined para mostrar todos los turnos, en vez de solo los ocupados
	};

	const isSwitchChecked = filters.get('libres') !== 'undefined' && filters.get('libres') !== null;

	return (
		<Paper sx={{ p: 2 }} variant="outlined">
			<Typography variant="h6" component="h3" sx={{ mb: 2 }}>
				Horarios disponibles
			</Typography>
			<FormControlLabel
				control={<Switch onChange={handleChange} checked={isSwitchChecked} />}
				label="Muestra solo los turnos disponibles"
			/>
		</Paper>
	);
};
