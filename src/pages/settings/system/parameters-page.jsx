import { useStore } from '@/store/use-store';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, TextInput } from '@/components/form';
import { useEditProfile } from '@/hooks/use-edit-profile';
import { useEditParameters } from './hooks/use-edit-parameters';

export const Component = () => {
	const clinic = useStore((state) => state.clinic);
	const editGeneralParameters = useEditParameters();
	const editProfileParameters = useEditProfile({ queryKeyToInvalidate: ['clinics'] });
	const [status, setStatus] = useState('idle');
	const [error, setError] = useState(null);

	const handleSubmit = async (formData) => {
		setStatus('loading');

		const { username, condicionFiscal, region, ...perfil } = formData;

		const newGeneralParameters = {
			username,
			condicionFiscal,
			region,
		};

		try {
			await editGeneralParameters.mutateAsync(newGeneralParameters);
			await editProfileParameters.mutateAsync({ perfilId: clinic.perfilId, ...perfil });
			setStatus('success');
		} catch (err) {
			setError(err);
			setStatus('error');
		}
	};
	return (
		<>
			<Helmet>
				<title>Parámetros de Sistema</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 4 }}>
					Parámetros
				</Typography>
				<Typography variant="h5" component="h2" sx={{ mb: 4 }}>
					Datos generales
				</Typography>
				<Form
					onSubmit={handleSubmit}
					defaultValues={{
						nombre: clinic.perfil.nombre,
						direccion: clinic.perfil.direccion,
						celular: clinic.perfil.celular,
						email: clinic.perfil.email,
						condicionFiscal: clinic.condicionFiscal,
						region: clinic.region,
						username: clinic.username,
					}}
				>
					<Stack gap={4}>
						<TextInput fullWidth label="Nombre" name="nombre" />
						<TextInput fullWidth label="Dirección" name="direccion" />
						<TextInput fullWidth label="Teléfono" name="celular" />
						<TextInput fullWidth label="Email" name="email" />
						<TextInput fullWidth label="Condición fiscal" name="condicionFiscal" />
						<TextInput fullWidth label="Región" name="region" />
						<TextInput fullWidth label="Nombre de usuario" name="username" />
						<Button variant="contained" type="submit">
							Guardar
						</Button>
					</Stack>
				</Form>

				<Box sx={{ mt: 2 }}>
					{status === 'loading' && <CircularProgress />}

					{status === 'error' && (
						<Alert severity="error">
							Error al editar parámetros: {error.response.data.message}.
						</Alert>
					)}

					{status === 'success' && (
						<Alert severity="success">Parámetros generales editados con éxito.</Alert>
					)}
				</Box>
			</Container>
		</>
	);
};
