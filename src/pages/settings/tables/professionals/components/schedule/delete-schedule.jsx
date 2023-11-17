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
import { dayJsDayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';
import { useDeleteSchedule } from '../../hooks/use-delete-schedule';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const DeleteSchedule = ({ open, onClose }) => {
	const { professionalInView, scheduleInView } = useProfessionalsContext();
	const { mutate, isLoading, isError, isSuccess, reset } = useDeleteSchedule();

	const handleDelete = () => {
		mutate(
			{ profesionalId: professionalInView.id, horarioId: scheduleInView.id },
			{
				onSuccess: () =>
					setTimeout(() => {
						onClose();
					}, 4_000),
			}
		);
	};

	useEffect(() => {
		if (!open) reset();
	}, [open, reset]);

	const formattedFromDate = new Date(
		0,
		0,
		0,
		Number(scheduleInView?.horaDesde.substring(0, 2)),
		Number(scheduleInView?.horaDesde.substring(3, 5))
	);

	const formattedToDate = new Date(
		0,
		0,
		0,
		Number(scheduleInView?.horaHasta.substring(0, 2)),
		Number(scheduleInView?.horaHasta.substring(3, 5))
	);

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>
				¿Quieres eliminar el horario del profesional {professionalInView?.perfil.nombre}{' '}
				{professionalInView?.perfil.apellido}?
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Los datos y turnos del horario del día {dayJsDayList[scheduleInView?.nroDia]}, de{' '}
					{dayjs(formattedFromDate).format('hh:mm A')} hasta{' '}
					{dayjs(formattedToDate).format('hh:mm A')}, vigente desde el día{' '}
					{dayjs(scheduleInView?.vigenciaDesde).format('DD [de] MMMM [del] YYYY')} hasta el{' '}
					{dayjs(scheduleInView?.vigenciaHasta).format('DD [de] MMMM [del] YYYY')} del profesional{' '}
					{professionalInView?.perfil.nombre} {professionalInView?.perfil.apellido} (Nº de cédula{' '}
					{professionalInView?.perfil.cedula}) no se podrán recuperar. ¿Quieres continuar?
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
					Hubo un problema eliminando el horario. Por favor, intente de nuevo o contacte a servicio
					al cliente.
				</Alert>
			</Collapse>
			<Collapse in={isSuccess}>
				<Alert severity="success">Horario eliminado exitosamente.</Alert>
			</Collapse>
		</Dialog>
	);
};
