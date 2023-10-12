import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ChecklistIcon from '@mui/icons-material/Checklist';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const cards = [
	{
		title: 'Sistema',
		links: [
			{
				Icon: SettingsIcon,
				text: 'Parámetros',
				href: './parametros',
			},
			{
				Icon: PeopleIcon,
				text: 'Usuarios',
				href: './usuarios',
			},
		],
	},
	{
		title: 'Tablas',
		links: [
			{
				Icon: PersonIcon,
				text: 'Profesionales',
				href: './profesionales',
			},
			{
				Icon: ChecklistIcon,
				text: 'Especialidades',
				href: './especialidades',
			},
			{
				Icon: BeachAccessIcon,
				text: 'Feriados',
				href: './feriados',
			},
		],
	},
];

export const SettingsPage = () => {
	return (
		<>
			<Helmet>
				<title>Configuración</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 4 }}>
					Configuración
				</Typography>
				<Stack gap={4}>
					{cards.map((card) => (
						<Paper key={card.title} variant="outlined" sx={{ padding: 2 }}>
							<Typography variant="h6" component="h2">
								{card.title}
							</Typography>
							<List disablePadding>
								{card.links.map((link) => (
									<ListItem key={link.href} disablePadding>
										<ListItemButton href={link.href}>
											<ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
												<link.Icon />
											</ListItemIcon>
											<ListItemText primary={link.text} />
											<KeyboardArrowRightIcon />
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</Paper>
					))}
				</Stack>
			</Container>
		</>
	);
};
