import { useStore } from '@/store/use-store';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Face6Icon from '@mui/icons-material/Face6';
import SettingsIcon from '@mui/icons-material/Settings';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

const navLinks = [
	{
		title: 'Agenda',
		Icon: EventNoteIcon,
		text: 'Optimiza la atención de tus pacientes: agenda citas, visualiza horarios disponibles y gestiona turnos de manera eficiente.',
		href: '/agenda',
	},
	{
		title: 'Pacientes',
		Icon: Face6Icon,
		text: 'Administra la información de tus pacientes de forma sencilla: agrega, edita, elimina y busca con total comodidad.',
		href: '/pacientes',
	},
	{
		title: 'Configuración de Sistema',
		Icon: SettingsIcon,
		text: 'Configura, administra y organiza el sistema de manera integral: desde datos de profesionales, horarios, ausencias, especialidades y días feriados, para una atención al paciente sin contratiempos.',
		href: '/configuracion',
	},
];

export const Component = () => {
	const { user } = useStore();

	return (
		<>
			<Helmet>
				<title>Hogar</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1">
					AConex
				</Typography>
				<Typography variant="subtitle1">
					Hola, {user.perfil.nombre} {user.perfil.apellido}
				</Typography>
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
								<Typography
									variant="h6"
									component="h2"
									sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
								>
									<link.Icon /> {link.title}
								</Typography>
								<Typography paragraph sx={{ mt: 1 }}>
									{link.text}
								</Typography>
							</Paper>
						</Link>
					))}
				</Stack>
			</Container>
		</>
	);
};
