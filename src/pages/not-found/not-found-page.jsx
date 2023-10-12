import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
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
