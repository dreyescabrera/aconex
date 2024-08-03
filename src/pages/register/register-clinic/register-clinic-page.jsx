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
import { useRegisterClinic } from '../hooks/use-register-clinic';

export const Component = () => {
	const [messageError, setMessageError] = useState('');
	const { mutate, isError, isLoading } = useRegisterClinic(setMessageError);
	const handleRegister = (formdata) => {
		let datos = { perfil: {}, clinica: {} };
		for (let key in formdata) {
			if (formdata[key] != '' && formdata[key] != undefined && formdata[key] != null) {
				if (key === 'username' || key === 'condicionFiscal' || key === 'region') {
					datos.clinica = { [key]: formdata[key], ...datos.clinica };
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
				<title>Registro Clínica</title>
			</Helmet>
			<Container
				maxWidth="xl"
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
				<Typography variant="h3" component="h1" align="center" my={1}>
					Registrar Clínica
				</Typography>
				<Form
					defaultValues={{
						nombre: '',
						apellido: '',
						email: '',
						cedula: 0,
						celular: 0,
						direccion: '',
						nacimiento: null,
						username: '',
						condicionFiscal: '',
						region: '',
					}}
					onSubmit={handleRegister}
				>
					<Stack spacing={1} sx={{ fontSize: 16 }}>
						<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<Box component="label" sx={{ flex: '1 1 20%' }}>
								Datos de la clínica:
							</Box>
							<Box sx={{ flex: '1 1 80%', display: 'flex', flexDirection: 'column', gap: 1 }}>
								<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
									<TextInput
										name="username"
										variant="outlined"
										label="Nombre de la clínica"
										placeholder="Nombre de la clínica"
									/>
								</Box>
								<Box sx={{ display: 'flex', gap: 1 }}>
									<TextInput
										name="condicionFiscal"
										variant="outlined"
										label="Condición fiscal"
										placeholder="Especifique la condición fiscal"
										sx={{ width: '50%' }}
									/>
									<TextInput
										name="region"
										variant="outlined"
										label="Región"
										placeholder="Región donde está la clínica"
										sx={{ width: '50%' }}
									/>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', margin: 0 }}>
							<Box component="label" sx={{ flex: '1 1 20%' }}>
								Nombre del perfil:
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
								Email del perfil:
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
								Cédula del perfil:
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
								Celular del perfil:
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
								Dirección del perfil:
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
						<Backdrop open={isLoading} sx={{ color: '#fff' }}>
							<CircularProgress color="inherit" />
						</Backdrop>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								type="submit"
								variant="contained"
								sx={{ textTransform: 'capitalize', fontSize: 16, width: '50%' }}
							>
								Registrar Clínica
							</Button>
						</Box>
					</Stack>
				</Form>
			</Container>
		</>
	);
};
