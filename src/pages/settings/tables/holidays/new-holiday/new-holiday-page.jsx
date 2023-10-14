import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { Form, TextInput } from '@/components/form';
import { DatePicker } from '@/components/form/date-picker';

export const NewHolidaysPage = () => {
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
				<Form onSubmit={console.log} defaultValues={{ dia: null, descripcion: '' }}>
					<Stack direction="row" spacing={4} justifyContent="start">
						<DatePicker name="dia" label="Día" />
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
			</Container>
		</>
	);
};
