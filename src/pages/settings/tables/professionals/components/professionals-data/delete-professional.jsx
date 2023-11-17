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
import { useProfessionalsContext } from '../../context/professionals.context';
import { useDeleteProfessional } from '../../hooks/use-delete-professional';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const DeleteProfessional = ({ open, onClose }) => {
	const { professionalInView } = useProfessionalsContext();
	const { mutate, isLoading, isError, isSuccess, reset } = useDeleteProfessional();

	const handleDelete = () => {
		mutate(professionalInView.id, {
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
			<DialogTitle>
				¿Quieres eliminar el profesional {professionalInView?.perfil.nombre}{' '}
				{professionalInView?.perfil.apellido}?
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Los datos del profesional {professionalInView?.perfil.nombre}{' '}
					{professionalInView?.perfil.apellido} (Nº de cédula {professionalInView?.perfil.cedula})
					no se podrán recuperar. ¿Quieres continuar?
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
					Hubo un problema eliminando el profesional. Por favor, intente de nuevo o contacte a
					servicio al cliente.
				</Alert>
			</Collapse>
			<Collapse in={isSuccess}>
				<Alert severity="success">Profesional eliminado exitosamente.</Alert>
			</Collapse>
		</Dialog>
	);
};
