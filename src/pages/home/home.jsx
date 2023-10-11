import EventNoteIcon from '@mui/icons-material/EventNote';
import Face6Icon from '@mui/icons-material/Face6';
import SettingsIcon from '@mui/icons-material/Settings';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const navLinks = [
	{
		title: 'Agenda',
		Icon: EventNoteIcon,
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		href: '/agenda',
	},
	{
		title: 'Pacientes',
		Icon: Face6Icon,
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		href: '/pacientes',
	},
	{
		title: 'Configuración de Sistema',
		Icon: SettingsIcon,
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
		href: '/configuracion',
	},
];

export const HomePage = () => {
	return (
		<>
			<Helmet>
				<title>Hogar</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1">
					&lt;Nombre de clínica&gt;
				</Typography>
				<Typography variant="subtitle1">Hola, &lt;nombre de usuario&gt;</Typography>
				<Stack spacing={3} sx={{ mt: 4 }}>
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							underline="none"
							sx={{
								transition: '200ms filter',
								'&:hover': {
									filter: 'invert(3%)',
								},
							}}
						>
							<Paper variant="outlined" sx={{ padding: 2 }}>
								<Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<link.Icon /> {link.title}
								</Typography>
								<Typography sx={{ mt: 1 }}>{link.text}</Typography>
							</Paper>
						</Link>
					))}
				</Stack>
			</Container>
		</>
	);
};
