import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCancelShift } from '../../hooks/use-cancel-shift';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.shift
 */
export const EraseShiftInfo = ({ open, onClose, shift }) => {
	const { mutate, isSuccess, isError } = useCancelShift();

	const handleErase = () => {
		mutate(
			{
				turnoId: shift.id,
				profesionalId: shift.profesionalId,
			},
			{ onSuccess: () => setTimeout(onClose, 1_000) }
		);
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Anular turno</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Estás a punto de borrar todos los datos de este turno, incluido la cita del paciente. El
					turno volverá a estar disponible. Estás seguro?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleErase}>Sí, anular turno</Button>
				<Button onClick={onClose} variant="contained">
					No, cerrar
				</Button>
			</DialogActions>
			<Collapse in={isSuccess}>
				<Alert severity="success">Éxito</Alert>
			</Collapse>
			<Collapse in={isError}>
				<Alert severity="error">Hubo un problema. Por favor, intenta de nuevo.</Alert>
			</Collapse>
		</Dialog>
	);
};
