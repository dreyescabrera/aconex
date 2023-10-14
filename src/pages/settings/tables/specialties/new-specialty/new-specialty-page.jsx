import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { Form, TextInput } from '@/components/form';

export const NewSpecialtiesPage = () => {
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
				<Form onSubmit={console.log} defaultValues={{ codigo: '', descripcion: '' }}>
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
			</Container>
		</>
	);
};
