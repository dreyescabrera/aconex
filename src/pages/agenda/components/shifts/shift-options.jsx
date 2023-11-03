import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAgendaContext } from '../../context/agenda.context';
import { EraseShiftInfo, PatientInfo, ShiftDetails } from '../dialogs';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		padding: '1rem',
		background: theme.palette.primary.main,
		color: 'white',
	},
}));

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const ShiftOptions = ({ open, onClose }) => {
	const { shiftInView } = useAgendaContext();

	const [dialog, setDialog] = useState(null);

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
		<Drawer
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
				</List>
			</Container>

			<ShiftDetails open={dialog === 'details'} onClose={onCloseDialog} shift={shiftInView} />
			<EraseShiftInfo open={dialog === 'erase'} onClose={onCloseDialog} shiftId={shiftInView?.id} />
			<PatientInfo
				open={dialog === 'patientInfo'}
				onClose={onCloseDialog}
				patient={shiftInView?.paciente}
			/>
		</Drawer>
	);
};
