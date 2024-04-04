import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
import { Presentismoselect } from '../dialogs/presentismo-select';

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

	/*como el presentismo no se actualiza con los cambios en el contexto, 
se uso un usestate que se activa solamente cuando ocurre un cambio 
hasta que se cierra el componente (present y setpresent) */

	if (!open && present != '') {
		setPresent('');
	}

	const Coloricon = ({ isshiftinview }) => {
		if (isshiftinview) {
			if (shiftInView && shiftInView != null) {
				if (
					shiftInView?.presentismo === null ||
					shiftInView?.presentismo === '' ||
					shiftInView?.presentismo === ' '
				) {
					return <FiberManualRecordIcon sx={{ color: 'transparent' }} />;
				} else {
					switch (shiftInView?.presentismo) {
						case 'Presente':
							return <FiberManualRecordIcon sx={{ color: '#63db8b' }} />;
						case 'Atendido':
							return <FiberManualRecordIcon sx={{ color: '#6ad3ee' }} />;
						case 'Ausento con aviso':
							return <FiberManualRecordIcon sx={{ color: '#d9e25d' }} />;
						case 'Ausento sin aviso':
							return <FiberManualRecordIcon sx={{ color: '#ee1919' }} />;
						case 'Confirmado':
							return <FiberManualRecordIcon sx={{ color: '#0f8519' }} />;
						case 'Cancelado':
							return <FiberManualRecordIcon sx={{ color: '#000000' }} />;
						default:
							return <FiberManualRecordIcon sx={{ color: 'transparent' }} />;
					}
				}
			}
		} else {
			switch (present) {
				case 'Presente':
					return <FiberManualRecordIcon sx={{ color: '#63db8b' }} />;
				case 'Atendido':
					return <FiberManualRecordIcon sx={{ color: '#6ad3ee' }} />;
				case 'Ausento con aviso':
					return <FiberManualRecordIcon sx={{ color: '#d9e25d' }} />;
				case 'Ausento sin aviso':
					return <FiberManualRecordIcon sx={{ color: '#ee1919' }} />;
				case 'Confirmado':
					return <FiberManualRecordIcon sx={{ color: '#0f8519' }} />;
				case 'Cancelado':
					return <FiberManualRecordIcon sx={{ color: '#000000' }} />;
				default:
					return <FiberManualRecordIcon sx={{ color: 'transparent' }} />;
			}
		}
	};

	const handleChangepresentismo = () => {
		setDialog('changePresentismo');
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
						) : (
							<ListItem disablePadding>
								<ListItemButton onClick={() => handleChangepresentismo()}>
									{shiftInView?.presentismo === null ||
									shiftInView?.presentismo === '' ||
									shiftInView?.presentismo === ' ' ? (
										<ListItemText
											primary="Presentismo: sin datos"
											secondary="Cambiar presentismo"
										/>
									) : (
										<ListItemText
											primary={`Presentismo: ${shiftInView?.presentismo}`}
											secondary="Cambiar presentismo"
										/>
									)}
								</ListItemButton>
								<ListItemIcon>
									<Coloricon isshiftinview={true} />
								</ListItemIcon>
							</ListItem>
						)
					) : (
						<ListItem disablePadding>
							<ListItemButton onClick={() => handleChangepresentismo()}>
								<ListItemText primary={`Presentismo: ${present}`} secondary="Cambiar presentismo" />
							</ListItemButton>
							<ListItemIcon>
								<Coloricon isshiftinview={false} />
							</ListItemIcon>
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
			<Presentismoselect
				open={dialog === 'changePresentismo'}
				onClose={onCloseDialog}
				id={shiftInView?.id}
				profesionalId={shiftInView?.profesionalId}
				presentismo={shiftInView?.presentismo}
				presentstate={present}
				presentedit={setPresent}
			/>
		</BottomDrawer>
	);
};
