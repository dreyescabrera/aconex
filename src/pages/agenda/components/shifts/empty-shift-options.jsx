import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiDrawer from '@mui/material/Drawer';
import Grow from '@mui/material/Grow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAgendaContext } from '../../context/agenda.context';
import { useEditShifts } from '../../hooks/use-edit-shifts';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		background: theme.palette.primary.main,
		color: 'white',
	},
}));

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EmptyShiftOptions = ({ open, onClose }) => {
	const { shiftInView } = useAgendaContext();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { mutate, isLoading, isSuccess } = useEditShifts();

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const disableShift = () => {
		mutate(
			{ shiftId: shiftInView?.id, habilitado: false },
			{ onSuccess: () => setTimeout(closeDialog, 2_000) }
		);
	};

	const options = [
		{
			text: 'Nuevo turno',
			href: './nuevo_turno',
			onClick: () => undefined,
		},
		{
			text: 'Nuevo sobreturno',
			href: './nuevo_sobreturno',
			onClick: () => undefined,
		},
		{
			text: 'No citar',
			onClick: () => setIsDialogOpen(true),
		},
	];

	return (
		<Drawer anchor="bottom" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Container>
				<Typography variant="h6" component="p">
					Turnos
				</Typography>
				<List>
					{options.map((option) => (
						<ListItem disablePadding key={option.text}>
							<ListItemButton
								onClick={option.onClick}
								to={option.href}
								state={{ shift: shiftInView }}
								component={Link}
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
			<Dialog open={isDialogOpen} onClose={closeDialog}>
				<DialogTitle>Deshabilitar turno</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Si confirmas, deshabilitarás el turno seleccionado. Quieres continuar?
					</DialogContentText>
					<DialogContentText
						sx={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20, mt: 1 }}
					>
						{dayjs(shiftInView?.date).format('MMMM DD | HH:mm   ')}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeDialog} disabled={isLoading}>
						No, cerrar
					</Button>
					<Button variant="contained" onClick={disableShift} disabled={isLoading}>
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
				<Grow in={isSuccess}>
					<Alert severity="success">Éxito</Alert>
				</Grow>
			</Dialog>
		</Drawer>
	);
};
