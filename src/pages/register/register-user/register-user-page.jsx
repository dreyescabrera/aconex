import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useRegister } from '../hooks/use-register-user';

export const Component = () => {
	const [messageError, setMessageError] = useState('');
	const { mutate, isError, isLoading: isLoadingRegister } = useRegister(setMessageError);
	const handleRegister = (formdata) => {
		let datos = { usuario: {}, perfil: {} };
		for (var key in formdata) {
			if (formdata[key] != '' && formdata[key] != undefined && formdata[key] != null) {
				if (key === 'clinica') {
					datos.usuario = {
						clinicaNombre: formdata['clinica'],
					};
				} else if (key === 'username' || key === 'password') {
					datos.usuario = { [key]: formdata[key], ...datos.usuario };
				} else {
					datos.perfil = { [key]: formdata[key], ...datos.perfil };
				}
			}
		}
		if (datos.perfil.celular) {
			datos.perfil.celular = Number(datos.perfil.celular);
		}

		if (datos.perfil.cedula) {
			datos.perfil.cedula = Number(datos.perfil.cedula);
		}

		if (datos.perfil.nacimiento) {
			datos.perfil.nacimiento = datos.perfil.nacimiento.format('MM/DD/YYYY');
		}

		mutate(datos);
	};
	return (
		<>
			<Helmet>
				<title>Registro Usuario</title>
			</Helmet>
			<Container maxWidth="xl">
				<Typography variant="h3" component="h1" align="center" my={1}>
					Registrar Usuario
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Form
						defaultValues={{
							clinica: '',
							username: '',
							password: '',
							nombre: '',
							apellido: '',
							email: '',
							cedula: 0,
							celular: 0,
							direccion: '',
							nacimiento: null,
						}}
						onSubmit={handleRegister}
					>
						<Stack spacing={4} sx={{ fontSize: 16, maxWidth: '600px' }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextInput
										name="clinica"
										variant="standard"
										label="Nombre de la clínica"
										placeholder="Nombre de la clínica"
									/>
									<TextInput
										name="username"
										variant="standard"
										label="Nombre de usuario"
										placeholder="Nombre de usuario"
									/>
									<TextInput
										name="password"
										type="password"
										variant="standard"
										label="Contraseña del usuario"
										placeholder="Tu contraseña de usuario"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextInput
										name="nombre"
										variant="standard"
										label="Nombre"
										placeholder="Nombre del usuario"
									/>
									<TextInput
										name="apellido"
										variant="standard"
										label="Apellido"
										placeholder="Apellido del usuario"
									/>
									<TextInput
										name="email"
										variant="standard"
										label="Email"
										placeholder="Email del usuario"
									/>
									<TextInput
										name="cedula"
										type="number"
										variant="standard"
										label="Cedula"
										rules={{ required: false }}
									/>
									<TextInput
										name="celular"
										type="number"
										variant="standard"
										label="Telefono/Celular"
										rules={{ required: false }}
									/>
									<TextInput
										name="direccion"
										variant="standard"
										label="Direccion"
										placeholder="Direccion del usuario"
										rules={{ required: false }}
									/>
									<DatePicker
										name="nacimiento"
										label="Fecha de nacimiento"
										slotProps={{ textField: { variant: 'standard' } }}
										disableFuture
										format="DD/MM/YYYY"
										rules={{ required: false }}
									/>
								</Grid>
								<Collapse in={isError}>
									<Alert severity="error">{messageError}</Alert>
								</Collapse>
								<Backdrop open={isLoadingRegister} sx={{ color: '#fff' }}>
									<CircularProgress color="inherit" />
								</Backdrop>
							</Grid>
							<Button
								type="submit"
								variant="contained"
								sx={{ textTransform: 'capitalize', fontSize: 16 }}
							>
								Registrarse
							</Button>
						</Stack>
					</Form>
				</Box>
			</Container>
		</>
	);
};
