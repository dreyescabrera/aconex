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

const Drawer = styled(MuiDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		background: theme.palette.primary.main,
		color: 'white',
	},
}));

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
		href: './',
		onClick: () => undefined,
	},
];

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EmptyShiftOptions = ({ open, onClose }) => {
	return (
		<Drawer anchor="bottom" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Container>
				<Typography variant="h6" component="p">
					Turnos
				</Typography>
				<List>
					{options.map((option) => (
						<ListItem disablePadding key={option.text}>
							<ListItemButton href={option.href}>
								<ListItemText primary={option.text} />
								<ListItemIcon>
									<KeyboardArrowRight sx={{ color: 'white' }} />
								</ListItemIcon>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Container>
		</Drawer>
	);
};
