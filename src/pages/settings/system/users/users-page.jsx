import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/use-users';

export const UsersPage = () => {
	const { data: users, status } = useUsers();

	return (
		<>
			<Helmet>
				<title>Usuarios</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Usuarios
				</Typography>
				<Paper variant="outlined" sx={{ padding: 2 }}>
					<Typography variant="h6" component="h2" fontWeight="200">
						Lista
					</Typography>

					{status === 'loading' && <CircularProgress />}

					{status === 'error' && <Alert severity="error"> Error al cargar lista de usuarios</Alert>}

					{status === 'success' && (
						<List disablePadding>
							{users.map((user, index) => (
								<ListItem key={index} disablePadding>
									<ListItemButton component={Link} state={{ user }} to="./editar">
										<ListItemText primary={user.perfil.nombre + ' ' + user.perfil.apellido} />
										<KeyboardArrowRight />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					)}
				</Paper>
				<Button fullWidth variant="contained" href="./nuevo" sx={{ mt: 'auto' }}>
					Agregar nuevo
				</Button>
			</Container>
		</>
	);
};
