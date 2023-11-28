import { useStore } from '@/store/use-store';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { EditPersonalInfo } from './components/edit-personal-info';
import { EditUserInfo } from './components/edit-user-info';

export const Component = () => {
	const user = useStore((state) => state.user);
	const [drawerToOpen, setDrawerToOpen] = useState(null);

	const handleClose = () => {
		setDrawerToOpen(null);
	};

	return (
		<>
			<Helmet>
				<title>Mi usuario</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1">
					Mi usuario
				</Typography>
				<Typography variant="h5" component="h2" sx={{ mt: 2 }}>
					Datos personales
				</Typography>
				<List>
					<ListItem>
						<ListItemText primary="Nombre" secondary={user.perfil.nombre} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Apellido" secondary={user.perfil.apellido} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Número de teléfono" secondary={user.perfil.celular} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Número de DNI o Pasaporte" secondary={user.perfil.cedula} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Dirección" secondary={user.perfil.direccion} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Correo electrónico" secondary={user.perfil.email} />
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Fecha de nacimiento"
							secondary={dayjs.utc(user.perfil.nacimiento).format('DD [de] MMMM, YYYY')}
						/>
					</ListItem>
				</List>
				<Button
					variant="contained"
					onClick={() => setDrawerToOpen('editPersonalInfo')}
					sx={{ my: 2 }}
				>
					Editar datos personales
				</Button>

				<Divider />

				<Typography variant="h5" component="h2" sx={{ mt: 2 }}>
					Datos de usuario
				</Typography>
				<List>
					<ListItem>
						<ListItemText primary="Nombre de usuario" secondary={user.username} />
					</ListItem>
				</List>
				<Button variant="outlined" onClick={() => setDrawerToOpen('editUserInfo')} sx={{ mt: 2 }}>
					Editar datos de usuario
				</Button>
			</Container>

			<EditPersonalInfo open={drawerToOpen === 'editPersonalInfo'} onClose={handleClose} />
			<EditUserInfo open={drawerToOpen === 'editUserInfo'} onClose={handleClose} />
		</>
	);
};
