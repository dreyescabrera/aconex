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
			<Container
				maxWidth="xl"
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
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
							<Grid item xs={12} sm={6} gap={12} sx={{ width: '40%' }}>
								<TextInput
									name="username"
									variant="outlined"
									label="Nombre de la clínica"
									placeholder="Nombre de la clínica"
									sx={{ margin: '3px 0' }}
								/>
								<TextInput
									name="condicionFiscal"
									variant="outlined"
									label="Condición fiscal"
									placeholder="Especifique la condición fiscal"
									sx={{ margin: '3px 0' }}
								/>
								<TextInput
									name="region"
									variant="outlined"
									label="Región"
									placeholder="Región donde está la clínica"
									sx={{ margin: '3px 0' }}
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
