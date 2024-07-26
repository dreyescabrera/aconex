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
										variant="outlined"
										label="Nombre de la clínica"
										placeholder="Nombre de la clínica"
										sx={{ margin: '3px 0' }}
									/>
									<TextInput
										name="username"
										variant="outlined"
										label="Nombre de usuario"
										placeholder="Nombre de usuario"
										sx={{ margin: '3px 0' }}
									/>
									<TextInput
										name="password"
										type="password"
										variant="outlined"
										label="Contraseña del usuario"
										placeholder="Tu contraseña de usuario"
										sx={{ margin: '3px 0' }}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextInput
										name="nombre"
										variant="outlined"
										label="Nombre"
										placeholder="Nombre del usuario"
										sx={{ margin: '3px 0' }}
									/>
									<TextInput
										name="apellido"
										variant="outlined"
										label="Apellido"
										placeholder="Apellido del usuario"
										sx={{ margin: '3px 0' }}
									/>
									<TextInput
										name="email"
										variant="outlined"
										label="Email"
										placeholder="Email del usuario"
										sx={{ margin: '3px 0' }}
									/>
									<TextInput
										name="cedula"
										type="number"
										variant="outlined"
										label="Cedula"
										rules={{ required: false }}
										sx={{ margin: '3px 0' }}
									/>
									<TextInput
										name="celular"
										type="number"
										variant="outlined"
										label="Telefono/Celular"
										rules={{ required: false }}
										sx={{ margin: '3px 0' }}
									/>
									<TextInput
										name="direccion"
										variant="outlined"
										label="Direccion"
										placeholder="Direccion del usuario"
										rules={{ required: false }}
										sx={{ margin: '3px 0' }}
									/>
									<DatePicker
										name="nacimiento"
										label="Fecha de nacimiento"
										slotProps={{ textField: { variant: 'outlined' } }}
										disableFuture
										format="DD/MM/YYYY"
										rules={{ required: false }}
										sx={{ margin: '3px 0' }}
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
