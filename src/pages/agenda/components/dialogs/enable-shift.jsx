import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { useEditShifts } from '../../hooks/use-edit-shifts';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.shift
 */
export const EnableShift = ({ open, onClose, shift }) => {
	const { mutate, isLoading, isSuccess, isError } = useEditShifts();

	const enableShift = () => {
		mutate(
			{ shiftId: shift?.id, profesionalId: shift?.profesionalId, habilitado: true },
			{ onSuccess: () => setTimeout(onClose, 2_000) }
		);
	};

	return (
		<Dialog open={open} onClose={onClose} sx={{ transition: 'height' }}>
			<DialogTitle>Habilitar turno</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Si confirmas, se volvera a habilitar el turno. Quieres continuar?
				</DialogContentText>
				<DialogContentText
					sx={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20, mt: 1 }}
				>
					{dayjs.tz(shift?.date, 'America/Argentina/Buenos_Aires').format('MMMM DD | HH:mm   ')}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={onClose} disabled={isLoading}>
					No, cerrar
				</Button>
				<Button variant="contained" onClick={enableShift} disabled={isLoading}>
					Sí, continuar
					{isLoading && (
						<CircularProgress
							size={24}
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								marginTop: '-12px',
								marginLeft: '-12px',
							}}
						/>
					)}
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
