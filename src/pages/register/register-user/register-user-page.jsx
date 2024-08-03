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
						<Stack spacing={1} sx={{ fontSize: 16, maxWidth: '600px' }}>
							<Grid
								item
								xs={12}
								sm={6}
								sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
							>
								<Box component="label" sx={{ flex: '1 1 20%' }}>
									Datos del usuario:
								</Box>
								<Box sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'column', gap: 1 }}>
									<Box sx={{ display: 'flex', gap: 1 }}>
										<TextInput
											name="clinica"
											variant="outlined"
											label="Nombre de la clínica"
											placeholder="Nombre de la clínica"
											sx={{ width: '50%' }}
										/>
										<TextInput
											name="username"
											variant="outlined"
											label="Nombre de usuario"
											placeholder="Nombre de usuario"
											sx={{ width: '50%' }}
										/>
									</Box>
									<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
										<TextInput
											name="password"
											type="password"
											variant="outlined"
											label="Contraseña del usuario"
											placeholder="Tu contraseña de usuario"
											sx={{}}
										/>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', margin: 0 }}>
								<Box component="label" sx={{ flex: '1 1 20%' }}>
									Nombre completo:
								</Box>
								<Box
									sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'row', gap: 1, margin: 0 }}
								>
									<TextInput
										name="nombre"
										variant="outlined"
										label="Nombre"
										placeholder="Nombre del usuario"
										sx={{ width: '50%' }}
									/>
									<TextInput
										name="apellido"
										variant="outlined"
										label="Apellido"
										placeholder="Apellido del usuario"
										sx={{ width: '50%' }}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
								<Box component="label" sx={{ flex: '1 1 20%' }}>
									Email del usuario:
								</Box>
								<Box sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'column', gap: 1 }}>
									<TextInput
										name="email"
										variant="outlined"
										label="Email"
										placeholder="Email del usuario"
									/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
								<Box component="label" sx={{ flex: '1 1 20%' }}>
									Cédula del usuario:
								</Box>
								<Box sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'column', gap: 1 }}>
									<TextInput
										name="cedula"
										type="number"
										variant="outlined"
										label="Cedula"
										rules={{ required: false }}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
								<Box component="label" sx={{ flex: '1 1 20%' }}>
									Celular del usuario:
								</Box>
								<Box sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'column', gap: 1 }}>
									<TextInput
										name="celular"
										type="number"
										variant="outlined"
										label="Telefono/Celular"
										rules={{ required: false }}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
								<Box component="label" sx={{ flex: '1 1 20%' }}>
									Dirección del usuario:
								</Box>
								<Box sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'column', gap: 1 }}>
									<TextInput
										name="direccion"
										variant="outlined"
										label="Dirección"
										placeholder="Direccion del usuario"
										rules={{ required: false }}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
								<Box component="label" sx={{ flex: '1 1 20%' }}>
									Fecha de nacimiento:
								</Box>
								<Box sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'column', gap: 1 }}>
									<DatePicker
										name="nacimiento"
										label="Fecha de nacimiento"
										slotProps={{ textField: { variant: 'outlined' } }}
										disableFuture
										format="DD/MM/YYYY"
										rules={{ required: false }}
									/>
								</Box>
							</Grid>
							<Collapse in={isError}>
								<Alert severity="error">{messageError}</Alert>
							</Collapse>
							<Backdrop open={isLoadingRegister} sx={{ color: '#fff' }}>
								<CircularProgress color="inherit" />
							</Backdrop>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<Button
									type="submit"
									variant="contained"
									sx={{ textTransform: 'capitalize', fontSize: 16, width: '50%' }}
								>
									Registrarse
								</Button>
							</Box>
						</Stack>
					</Form>
				</Box>
			</Container>
		</>
	);
};
