import { Button, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

export const NotFoundPage = () => {
	return (
		<>
			<Helmet>
				<title>Página no encontrada</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1">
					Página no encontrada
				</Typography>
				<Button href="/" variant="contained" sx={{ mt: 2 }}>
					Ir al home
				</Button>
			</Container>
		</>
	);
};
