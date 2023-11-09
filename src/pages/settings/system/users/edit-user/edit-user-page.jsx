import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { ProfileData } from './components/profile-data';
import { UserData } from './components/user-data';
import { EditUserProvider } from './context/edit-user.context';

export const EditUsersPage = (user) => {
	return (
		<>
			<Helmet>
				<title>Editar Usuario</title>
			</Helmet>
			<EditUserProvider>
				<Container>
					<Typography variant="h3" component="h1" sx={{ mb: 4 }}>
						Editar Usuario
					</Typography>
					<Stack direction="row">
						<ProfileData user={user} />
						<UserData user={user} />
					</Stack>
				</Container>
			</EditUserProvider>
		</>
	);
};
