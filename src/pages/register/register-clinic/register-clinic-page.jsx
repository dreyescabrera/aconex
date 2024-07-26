import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
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
			<Container maxWidth="xs">
				<Typography variant="h3" component="h1" align="center" my={6}>
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
					<Stack spacing={4} sx={{ fontSize: 16, maxWidth: '600px' }}>
						<Grid container spacing={2} sx={{ padding: '16px 8px 0 8px' }}>
							<Grid item xs={12} sm={6} sx={{ padding: '16px 8px 0 8px' }}>
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
							<Grid item xs={12} sm={6}>
								<TextInput
									name="username"
									variant="standard"
									label="Nombre de la clínica"
									placeholder="Nombre de la clínica"
								/>
								<TextInput
									name="condicionFiscal"
									variant="standard"
									label="Condición fiscal"
									placeholder="Especifique la condición fiscal"
								/>
								<TextInput
									name="region"
									variant="standard"
									label="Región"
									placeholder="Región donde está la clínica"
								/>
							</Grid>
						</Grid>
						<Collapse in={isError}>
							<Alert severity="error">{messageError}</Alert>
						</Collapse>
						<Backdrop open={isLoading} sx={{ color: '#fff' }}>
							<CircularProgress color="inherit" />
						</Backdrop>
						<Button
							type="submit"
							variant="contained"
							sx={{ textTransform: 'capitalize', fontSize: 16 }}
						>
							Registrar Clínica
						</Button>
					</Stack>
				</Form>
			</Container>
		</>
	);
};
