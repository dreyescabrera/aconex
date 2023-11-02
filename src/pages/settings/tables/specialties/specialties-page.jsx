import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { api } from '@/services/api';

async function fetchspecialties() {
	const res = await api.get(
		'/especialidades/1' //Es Necesario especificar la clinica que maneja tales especialidades (especialidades/1)
	);
	return res;
}

const Specialties = () => {
	const { data, status } = useQuery(['specialty'], fetchspecialties);
	if (status === 'loading') {
		return <p>Cargando...</p>;
	}

	if (status === 'error') {
		return <p>Error al cargar!</p>;
	}
	return (
		<List>
			{data.data.map((specialty) => (
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

export const SpecialtiesPage = () => {
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
