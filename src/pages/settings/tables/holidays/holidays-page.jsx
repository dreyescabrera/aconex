import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { api } from '@/services/api';

async function fetchdates() {
	const res = await api.get(
		'/feriados/1' //Es Necesario especificar la clinica que maneja tales especialidades (especialidades/1)
	);
	return res;
}

const Menssagedeletion = ({ status }) => {
	if (status.isLoading) {
		return <p> </p>;
	}
	if (status.isSuccess) {
		return (
			<div>
				<p> </p>
			</div>
		);
	}
	if (status.isError) {
		return <p>Error al borrar</p>;
	}
};

const Holidays = () => {
	const { data, status, refetch } = useQuery(['holiday'], fetchdates);
	const mutation = useMutation(deletedates);
	const handleDeletion = (id, mutation) => {
		mutation.mutate(id);
	};

	async function deletedates(id) {
		var id2 = id.toString();
		var endpoint = '/feriados/1/' + id2; //Es Necesario especificar la clinica que agregara tal feriado (clinicaId)
		const res = await api.delete(endpoint).then(() => refetch());
		return res;
	}

	if (status === 'loading') {
		return <p>Cargando...</p>;
	}

	if (status === 'error') {
		return <p>Error al Cargar, no se pudieron obtener los datos</p>;
	}

	if (status === 'success') {
		var i = 0;
		var holidaylist = [];
		var holidayobject;
		var size = data.data.length;
		var id;
		var date = 'fecha';
		var descripcion = 'descripcion';
		var z;
		var z1;
		var result;
		for (i = 0; i < size; i++) {
			id = data.data[i].id;
			date = data.data[i].fecha;
			descripcion = data.data[i].descripcion;
			z = date.split('-');
			z1 = z[2].split('T');
			result = z1[0] + '/' + z[1];
			holidayobject = { id: id, fecha: result, descripcion: descripcion };
			holidaylist.push(holidayobject);
		}
		return (
			<List>
				{holidaylist.map((holiday) => (
					<ListItem
						key={holiday.id}
						id={holiday.id}
						sx={{
							'&:not(:last-child)': {
								borderBottom: '1px solid #DADADAC5',
								pb: 1,
								mb: 1,
							},
						}}
						secondaryAction={
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => handleDeletion(holiday.id, mutation)}
							>
								<DeleteForeverIcon />
							</IconButton>
						}
						disablePadding
					>
						<ListItemText primary={holiday.fecha} secondary={holiday.descripcion} />
					</ListItem>
				))}
				<Menssagedeletion status={mutation} />
			</List>
		);
	}
};

export const HolidaysPage = () => {
	return (
		<>
			<Helmet>
				<title>Feriados</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Feriados
				</Typography>
				<Holidays />
				<Button variant="contained" sx={{ mt: 'auto' }} href="./nuevo">
					Agregar nuevo
				</Button>
			</Container>
		</>
	);
};
