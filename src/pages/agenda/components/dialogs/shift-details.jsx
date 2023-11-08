import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import dayjs from 'dayjs';
import { useProfessionals } from '@/hooks/use-professionals';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.shift
 */
export const ShiftDetails = ({ open, onClose, shift }) => {
	const { data: professional, isLoading: professionalIsLoading } = useProfessionals(
		shift.profesionalId
	);

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Detalles del turno</DialogTitle>
			<DialogContent dividers>
				<List disablePadding>
					<ListItem disableGutters>
						<ListItemText
							primary="Paciente"
							secondary={`${shift.paciente.perfil.nombre} ${shift.paciente.perfil.apellido}`}
						/>
					</ListItem>
					<ListItem disableGutters>
						<ListItemText
							primary="Profesional"
							secondary={
								professionalIsLoading
									? 'Cargando'
									: `${professional.perfil.nombre} ${professional.perfil.apellido}`
							}
						/>
					</ListItem>
					<ListItem disableGutters>
						<ListItemText primary="Observación" secondary={shift.observacion} />
					</ListItem>
					<ListItem disableGutters>
						<ListItemText primary="Presentismo" secondary={shift.presentismo} />
					</ListItem>
					<ListItem disableGutters>
						<ListItemText primary="Obra Social" secondary={shift.obraSocial} />
					</ListItem>
					<ListItem disableGutters>
						<ListItemText
							primary="Turno"
							secondary={dayjs(shift.date).format('dddd DD [de] MMMM, hh:mm A')}
							sx={{ textTransform: 'capitalize' }}
						/>
					</ListItem>
				</List>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cerrar</Button>
			</DialogActions>
		</Dialog>
	);
};
