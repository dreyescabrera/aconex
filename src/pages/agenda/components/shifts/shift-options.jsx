import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomDrawer } from '@/components/drawers';
import { useAgendaContext } from '../../context/agenda.context';
import { useEditShifts } from '../../hooks/use-edit-shifts';
import { EraseShiftInfo, PatientInfo, ShiftDetails } from '../dialogs';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const ShiftOptions = ({ open, onClose }) => {
	const { shiftInView } = useAgendaContext();
	const editarturnomutation = useEditShifts();

	const [dialog, setDialog] = useState(null);
	const [present, setPresent] = useState('');

	if (!open && present != '') {
		setPresent('');
	}

	const handleChangepresentismo = (presentismostatus) => {
		editarturnomutation.mutate(
			{
				shiftId: shiftInView.id,
				profesionalId: shiftInView.profesionalId,
				presentismo: presentismostatus,
			},
			{ onSuccess: () => setPresent(presentismostatus) }
		);
	};

	const onCloseDialog = () => {
		setDialog(null);
	};

	const options = [
		{
			text: 'Nuevo sobreturno',
			href: './nuevo_sobreturno',
		},
		{
			text: 'Modificar turno',
			href: './editar_turno',
		},
		{
			text: 'Detalles',
			onClick: () => setDialog('details'),
		},
		{
			text: 'Anular turno',
			onClick: () => setDialog('erase'),
		},
		{
			text: 'Datos del paciente',
			onClick: () => setDialog('patientInfo'),
		},
	];

	return (
		<BottomDrawer
			anchor="bottom"
			open={open}
			onClose={onClose}
			sx={{
				zIndex: 1201,
			}}
		>
			<Container>
				<Typography variant="h6" component="p">
					Turnos
				</Typography>
				<List>
					{options.map((option) => (
						<ListItem disablePadding key={option.text}>
							<ListItemButton
								component={option.href ? Link : 'button'}
								to={option.href}
								onClick={option.onClick}
								state={{ shift: shiftInView }}
							>
								<ListItemText primary={option.text} />
								<ListItemIcon>
									<KeyboardArrowRight sx={{ color: 'white' }} />
								</ListItemIcon>
							</ListItemButton>
						</ListItem>
					))}
					{present === '' ? (
						shiftInView === undefined || shiftInView === null ? (
							<div />
						) : shiftInView?.presentismo === null || shiftInView?.presentismo != 'Presente' ? (
							<ListItem disablePadding>
								<ListItemButton onClick={() => handleChangepresentismo('Presente')}>
									{shiftInView?.presentismo === null ? (
										<ListItemText primary="Presentismo: sin datos" secondary="Cambiar a Presente" />
									) : (
										<ListItemText
											primary={`Presentismo: ${shiftInView.presentismo}`}
											secondary="Cambiar a Presente"
										/>
									)}
									<ListItemIcon>
										<CoPresentIcon />
									</ListItemIcon>
								</ListItemButton>
							</ListItem>
						) : (
							<ListItem disablePadding>
								<ListItemButton onClick={() => handleChangepresentismo('Ausente')}>
									<ListItemText
										primary={`Presentismo: ${shiftInView.presentismo}`}
										secondary="Cambiar a Ausente"
									/>
									<ListItemIcon>
										<CancelPresentationIcon />
									</ListItemIcon>
								</ListItemButton>
							</ListItem>
						)
					) : present === 'Ausente' ? (
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleChangepresentismo('Presente')}>
								<ListItemText primary={`Presentismo: ${present}`} secondary="Cambiar a Presente" />
								<ListItemIcon>
									<CancelPresentationIcon />
								</ListItemIcon>
							</ListItemButton>
						</ListItem>
					) : (
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleChangepresentismo('Ausente')}>
								<ListItemText primary={`Presentismo: ${present}`} secondary="Cambiar a Ausente" />
								<ListItemIcon>
									<CoPresentIcon />
								</ListItemIcon>
							</ListItemButton>
						</ListItem>
					)}
				</List>
				{editarturnomutation.isError ? (
					<div>
						Hubo un problema al cambiar presentismo
						{/* @ts-ignore */}
						{editarturnomutation.error?.response.data.message}
					</div>
				) : (
					<div />
				)}
			</Container>

			<ShiftDetails open={dialog === 'details'} onClose={onCloseDialog} shift={shiftInView} />
			<EraseShiftInfo open={dialog === 'erase'} onClose={onCloseDialog} shift={shiftInView} />
			<PatientInfo
				open={dialog === 'patientInfo'}
				onClose={onCloseDialog}
				patient={shiftInView?.paciente}
			/>
		</BottomDrawer>
	);
};
