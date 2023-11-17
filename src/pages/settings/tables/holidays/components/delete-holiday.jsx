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
import { useEffect } from 'react';
import { useDeleteHoliday } from '../hooks/use-delete-holiday';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.holidayToDelete
 */
export const DeleteHoliday = ({ open, onClose, holidayToDelete }) => {
	const { mutate, isLoading, isError, isSuccess, reset } = useDeleteHoliday();

	const handleDeleteHoliday = () => {
		mutate(holidayToDelete.id, {
			onSuccess: () =>
				setTimeout(() => {
					onClose();
				}, 4_000),
		});
	};

	useEffect(() => {
		if (!open) reset();
	}, [open, reset]);

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>¿Quieres eliminar el día feriado?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Los datos del día feriado {holidayToDelete?.descripcion},{' '}
					{dayjs(holidayToDelete?.fecha).format('DD [de] MMMM, YYYY')} no se podrán recuperar.
					¿Quieres continuar?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDeleteHoliday} disabled={isLoading || isSuccess}>
					Aceptar
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
				<Button onClick={onClose}>Cerrar</Button>
			</DialogActions>

			<Collapse in={isError}>
				<Alert severity="error">
					Hubo un problema eliminando el feriado. Por favor, intente de nuevo o contacte a servicio
					al cliente.
				</Alert>
			</Collapse>
			<Collapse in={isSuccess}>
				<Alert severity="success">Feriado eliminado exitosamente.</Alert>
			</Collapse>
		</Dialog>
	);
};
