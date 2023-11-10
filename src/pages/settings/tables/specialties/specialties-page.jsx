import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { useSpecialties } from '@/hooks/use-specialties';

const Specialties = () => {
	const { data: specialties, status } = useSpecialties();

	if (status === 'loading') {
		return <Alert severity="info">Cargando...</Alert>;
	}

	if (status === 'error') {
		return (
			<Alert severity="error">
				Hubo un problema. Por favor, recargue la página o contacte a servicio al cliente .
			</Alert>
		);
	}

	return (
		<List>
			{specialties.map((specialty) => (
				<ListItem
					key={specialty.id}
					sx={{
						'&:not(:last-child)': {
							borderBottom: '1px solid #DADADAC5',
							pb: 1,
							mb: 1,
						},
					}}
					disablePadding
				>
					<ListItemText primary={specialty.nombre} secondary={`Código: ${specialty.id}`} />
				</ListItem>
			))}
		</List>
	);
};

export const Component = () => {
	return (
		<>
			<Helmet>
				<title>Especialidades</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Especialidades
				</Typography>
				<Specialties />
				<Button variant="contained" sx={{ mt: 'auto' }} href="./nuevo">
					Agregar nuevo
				</Button>
			</Container>
		</>
	);
};
