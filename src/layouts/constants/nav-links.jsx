import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import Person2Rounded from '@mui/icons-material/Person2Rounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';

export const navLinks = [
	{
		id: 1,
		text: 'Hogar',
		href: '/home',
		icon: <HomeRounded />,
	},
	{
		id: 2,
		text: 'Agenda',
		href: '/agenda',
		icon: <CalendarMonthRounded />,
	},
	{
		id: 3,
		text: 'Pacientes',
		href: '/pacientes',
		icon: <Person2Rounded />,
	},
	{
		id: 4,
		text: 'Configuración de Sistema',
		href: '/configuracion',
		icon: <SettingsRounded />,
	},
];
