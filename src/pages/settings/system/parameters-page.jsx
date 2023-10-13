import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { Form, TextInput } from '@/components/form';

export const ParametersPage = () => {
	return (
		<>
			<Helmet>
				<title>Parametros de Sistema</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 4 }}>
					Parámetros
				</Typography>
				<Typography variant="h5" component="h2" sx={{ mb: 4 }}>
					Datos generales
				</Typography>
				<Form
					onSubmit={console.log}
					defaultValues={{
						nombre: '',
						direccion: '',
						celular: '',
						email: '',
						condicionFiscal: '',
						region: '',
					}}
				>
					<Stack gap={4}>
						<TextInput fullWidth label="Nombre" name="nombre" />
						<TextInput fullWidth label="Dirección" name="direccion" />
						<TextInput fullWidth label="Teléfono" name="celular" />
						<TextInput fullWidth label="Email" name="email" />
						<TextInput fullWidth label="Condición fiscal" name="condicionFiscal" />
						<TextInput fullWidth label="Región" name="region" />
						<Button variant="contained" type="submit">
							Guardar
						</Button>
					</Stack>
				</Form>
			</Container>
		</>
	);
};
