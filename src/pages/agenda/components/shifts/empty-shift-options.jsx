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
import { DisableShift } from '../dialogs';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EmptyShiftOptions = ({ open, onClose }) => {
	const { shiftInView } = useAgendaContext();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const closeDialog = () => {
		setIsDialogOpen(false);
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
		<BottomDrawer anchor="bottom" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
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
								component={option.href ? Link : 'button'}
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
			<DisableShift open={isDialogOpen} onClose={closeDialog} shift={shiftInView} />
		</BottomDrawer>
	);
};
