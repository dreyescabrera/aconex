import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { DatePicker, Form, TextInput } from '@/components/form';
import { api } from '@/services/api';

async function addholiday(holiday) {
	const res = api.post('/feriados', holiday);
	return res;
}

const Mensaje = ({ status }) => {
	if (status.isLoading) {
		return <p>Cargando...</p>;
	}
	if (status.isSuccess) {
		return (
			<div>
				<p>Feriado Agregado con exito!</p>
				<Button variant="contained" sx={{ mt: 'auto' }} href="../">
					Volver
				</Button>
			</div>
		);
	}
	if (status.isError) {
		return <p>Error al agregar Feriado</p>;
	}
};

export const NewHolidaysPage = () => {
	const mutation = useMutation(addholiday);
	const handleSubmit = (event) => {
		var date = event.dia.format('MM/DD').toString();
		let holiday = { clinicaId: 1, descripcion: event.descripcion, fecha: date }; //Es Necesario especificar la clinica que agregara tal feriado (clinicaId)
		mutation.mutate(holiday);
	};
	return (
		<>
			<Helmet>
				<title>Nuevo Feriado</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Nuevo Feriado
				</Typography>
				<Typography paragraph>Especifica el día y descripción del nuevo feriado</Typography>
				<Form onSubmit={handleSubmit} defaultValues={{ dia: null, descripcion: '' }}>
					<Stack direction="row" spacing={4} justifyContent="start">
						<DatePicker name="dia" label="Día" disablePast />
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
				<Mensaje status={mutation} />
			</Container>
		</>
	);
};
