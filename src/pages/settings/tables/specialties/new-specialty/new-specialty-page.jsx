import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Form, TextInput } from '@/components/form';
import { api } from '@/services/api';

async function addspecialty(specialty) {
	const res = await api.post('/especialidades', specialty);
	return res;
}

const Message = ({ status }) => {
	if (status.isLoading) {
		return <p>Cargando...</p>;
	}
	if (status.isSuccess) {
		return <p>Especialidad agregada con exito</p>;
	}
	if (status.isError) {
		return <p>Error al agregar especialidad</p>;
	}
};

export const NewSpecialtiesPage = () => {
	const mutation = useMutation(addspecialty);
	const handleSubmit = (event) => {
		let specialty = { clinicaId: event.codigo, nombre: event.descripcion }; //el Codigo de la clinica debe obtenerse desde los datos del usuario
		mutation.mutate(specialty);
	};

	return (
		<>
			<Helmet>
				<title>Nueva Especialidad</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Nueva Especialidad
				</Typography>
				<Typography paragraph>
					Especifica el código y descripción de la nueva especialidad
				</Typography>
				<Form onSubmit={handleSubmit} defaultValues={{ codigo: '', descripcion: '' }}>
					<Stack direction="row" spacing={4} justifyContent="start">
						<TextInput name="codigo" label="Código" variant="outlined" type="number" />
						<TextInput
							name="descripcion"
							label="Descripción"
							variant="outlined"
							fullWidth
							multiline
							maxRows={3}
						/>
					</Stack>
					<Button type="submit" variant="contained" sx={{ mt: 4 }}>
						Agregar
					</Button>
				</Form>
				<Message status={mutation} />
			</Container>
		</>
	);
};
