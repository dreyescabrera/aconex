import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useDeletePatient } from '../hooks/use-delete-patient';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.patientToDelete
 */
export const DeletePatient = ({ open, onClose, patientToDelete }) => {
	const { mutate, isLoading, isError, isSuccess, reset } = useDeletePatient();

	const handleDelete = () => {
		mutate(patientToDelete.id, {
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
			<DialogTitle>¿Quieres eliminar el paciente?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Los datos del paciente {patientToDelete?.perfil.nombre} {patientToDelete?.perfil.apellido}{' '}
					(Nº de DNI/Pasaporte {patientToDelete?.perfil.cedula}) no se podrán recuperar. ¿Quieres
					continuar?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDelete} disabled={isLoading || isSuccess}>
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
					Hubo un problema eliminando el paciente. Por favor, intente de nuevo o contacte a servicio
					al cliente.
				</Alert>
			</Collapse>
			<Collapse in={isSuccess}>
				<Alert severity="success">Paciente eliminado exitosamente.</Alert>
			</Collapse>
		</Dialog>
	);
};
