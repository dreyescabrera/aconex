import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useCreateHoliday } from '../hooks/use-create-holiday';

export const NewHolidaysPage = () => {
	const { mutate, status } = useCreateHoliday();

	const handleSubmit = (formData) => {
		const date = formData.dia.format('MM/DD');

		mutate({ descripcion: formData.descripcion, fecha: date });
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

				{status === 'loading' && <Alert severity="info">Cargando...</Alert>}

				{status === 'success' && (
					<div>
						<Alert severity="success">Feriado Agregado con exito!</Alert>
						<Button variant="contained" sx={{ mt: 2 }} href="../">
							Volver
						</Button>
					</div>
				)}
			</Container>
		</>
	);
};
