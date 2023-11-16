import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useEditProfile } from '@/hooks/use-edit-profile';

export const Component = () => {
	const {
		state: { user },
	} = useLocation();
	const { mutate, status } = useEditProfile({ queryKeyToInvalidate: ['users'] });

	const handleEditUser = (formData) => {
		mutate({ ...formData, perfilId: user.perfil.id });
	};

	return (
		<>
			<Helmet>
				<title>Editar Usuario</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 4 }}>
					Editar Usuario
				</Typography>
				<Typography variant="body1" sx={{ mb: 4 }}>
					{user.perfil.nombre} {user.perfil.apellido} {user.perfil.email}
				</Typography>
				<Form
					onSubmit={handleEditUser}
					defaultValues={{
						nombre: user.perfil.nombre,
						apellido: user.perfil.apellido,
						cedula: user.perfil.cedula,
						celular: user.perfil.celular,
						direccion: user.perfil.direccion,
						email: user.perfil.email,
						nacimiento: dayjs(user.perfil.nacimiento),
					}}
				>
					<Stack gap={4}>
						<TextInput name="nombre" label="Nombre" />
						<TextInput name="apellido" label="Apellido" />
						<TextInput name="cedula" label="Cédula" />
						<TextInput name="celular" label="Celular" />
						<TextInput name="direccion" label="Dirección" />
						<TextInput name="email" label="Email" />
						<DatePicker
							name="nacimiento"
							label="Nacimiento"
							disableFuture
							slotProps={{ textField: { variant: 'standard' } }}
						/>
						<Button variant="contained" type="submit">
							Editar usuario
						</Button>
					</Stack>
				</Form>

				{status === 'loading' && <CircularProgress />}
				{status === 'error' && (
					<Alert severity="error">
						Hubo un problema editando el usuario. Por favor, intente de nuevo.
					</Alert>
				)}
				{status === 'success' && (
					<Stack spacing={3} sx={{ my: 4, justifyContent: 'start' }}>
						<Alert severity="success">Usuario editado con éxito.</Alert>
						<Button variant="contained" href="../" sx={{ width: 'max-content' }}>
							Volver
						</Button>
					</Stack>
				)}
			</Container>
		</>
	);
};
