import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const fakeUsers = ['Diego', 'Camila', 'Nahuel'];

export const UsersPage = () => {
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
					<List disablePadding>
						{fakeUsers.map((user, index) => (
							<ListItem key={index} disablePadding>
								<ListItemButton>
									<ListItemText primary={user} />
									<KeyboardArrowRight />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Paper>
				<Button fullWidth variant="contained" href="./nuevo" sx={{ mt: 'auto' }}>
					Agregar nuevo
				</Button>
			</Container>
		</>
	);
};
