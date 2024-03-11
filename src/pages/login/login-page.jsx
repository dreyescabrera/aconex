import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, TextInput } from '@/components/form';
import { useLogin } from './hooks/use-login';

export const Component = () => {
	const [hasFailedOnce, setHasFailedOnce] = useState(false);
	const { mutate, isError, isLoading } = useLogin();
	const handleLogin = (credentials) => {
		mutate(credentials);
	};

	if (isError) {
		!hasFailedOnce && setHasFailedOnce(true);
	}

	return (
		<>
			<Helmet>
				<title>Iniciar sesión</title>
			</Helmet>
			<Container maxWidth="xs">
				<Typography variant="h3" component="h1" align="center" my={6}>
					Iniciar Sesión
				</Typography>

				<Form
					defaultValues={{ usernameclinica: '', username: '', password: '' }}
					onSubmit={handleLogin}
				>
					<Stack spacing={4} sx={{ fontSize: 16 }}>
						<TextInput
							name="usernameclinica"
							variant="standard"
							label="Usuario de Clínica"
							placeholder="El usuario de la clínica"
						/>
						<TextInput
							name="username"
							variant="standard"
							label="Usuario de Empleado"
							placeholder="Tu usuario de empleado"
						/>
						<TextInput
							name="password"
							type="password"
							variant="standard"
							label="Contraseña"
							placeholder="Tu contraseña"
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ textTransform: 'capitalize', fontSize: 16 }}
						>
							Continuar
						</Button>
						<Collapse in={hasFailedOnce}>
							<Alert severity="error">
								Las credenciales ingresadas no coinciden. Por favor, revisa los datos ingresados e
								intenta de nuevo.
							</Alert>
						</Collapse>
					</Stack>
				</Form>
				<Typography variant="body1" mt={3} align="center">
					Todavía no tienes una cuenta?{' '}
					<Link href="https://forms.gle/2UCdXSfQFxhA2iPu7" underline="hover" color="#5d8bff">
						Regístrate
					</Link>
				</Typography>
				<Backdrop open={isLoading} sx={{ color: '#fff' }}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</Container>
		</>
	);
};
