import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

export const Component = () => {
	return (
		<>
			<Helmet>
				<title>Registro</title>
			</Helmet>
			<Typography variant="h3" component="h1" align="center" my={1}>
				Registros
			</Typography>
			<Container maxWidth="xs">
				<Stack spacing={4} sx={{ fontSize: 16 }}>
					<Button variant="contained" sx={{ textTransform: 'capitalize', fontSize: 16 }}>
						<Link href="/register/clinic" underline="none" color="inherit">
							Busco servicio
						</Link>
					</Button>
					<Button variant="contained" sx={{ textTransform: 'capitalize', fontSize: 16 }}>
						<Link href="/register/user" underline="none" color="inherit">
							Ofrezco servicio/creación de usuarios
						</Link>
					</Button>
				</Stack>
			</Container>
		</>
	);
};
