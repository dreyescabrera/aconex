import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { ProfileData } from './components/profile-data';
import { UserData } from './components/user-data';
import { NewUserProvider } from './context/new-user.context';

export const NewUsersPage = () => {
	return (
		<>
			<Helmet>
				<title>Agregar Usuario</title>
			</Helmet>
			<NewUserProvider>
				<Container>
					<Typography variant="h3" component="h1" sx={{ mb: 4 }}>
						Agregar Usuario
					</Typography>
					<Stack direction="row">
						<ProfileData />
						<UserData />
					</Stack>
				</Container>
			</NewUserProvider>
		</>
	);
};
