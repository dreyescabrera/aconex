import { useStore } from '@/store/use-store';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Form, TextInput } from '@/components/form';
import { api } from '@/services/api';

async function editprofile(id, data) {
	const endpoint = `/perfiles/${id}`;
	const response = await api.patch(endpoint, data);
	return response;
}

const useEditprofile = () => {
	const mutationFn = (data) => {
		return editprofile(data[0], data[1]);
	};
	return useMutation({ mutationFn });
};

async function updateparameters(clinicaId, data) {
	const endpoint = `/clinicas/${clinicaId}`;
	const response = await api.patch(endpoint, data);
	return response;
}

const useEditparameters = () => {
	const { clinicaId } = useStore((state) => state.clinic);
	const mutationFn = (data) => {
		return updateparameters(clinicaId, data);
	};
	return useMutation({ mutationFn });
};

async function fetchparameters(clinicaid) {
	const endpoint = `/clinicas/${clinicaid}`;
	const response = await api.get(endpoint);
	return response;
}

const useParameters = () => {
	const { clinicaId } = useStore((state) => state.clinic);
	return useQuery({
		queryKey: ['parameters', clinicaId],
		queryFn: () => fetchparameters(clinicaId),
	});
};

export const ParametersPage = () => {
	const { data: parameters, status: estado } = useParameters();
	const editgeneralparameters = useEditparameters();
	const editprofileparameters = useEditprofile();
	const handleSubmit = (ev) => {
		const parameterstatus = {
			username: ev.nombre,
			condicionFiscal: ev.condicionFiscal,
			region: ev.region,
		};
		editgeneralparameters.mutate(parameterstatus);
		const id = parameters.data.perfil.id;
		const profile = {
			direccion: ev.direccion,
			celular: ev.celular,
			email: ev.email,
		};
		const profileparameters = [id, profile];
		editprofileparameters.mutate(profileparameters);
	};
	return (
		<>
			<Helmet>
				<title>Parametros de Sistema</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 4 }}>
					Parámetros
				</Typography>
				{estado === 'success' ? (
					<div>
						<Typography variant="h5" component="h2" sx={{ mb: 4 }}>
							Datos generales
						</Typography>
						<Form
							onSubmit={handleSubmit}
							defaultValues={{
								nombre: parameters?.data.username,
								direccion: parameters?.data.perfil.direccion,
								celular: parameters?.data.perfil.celular,
								email: parameters?.data.perfil.email,
								condicionFiscal: parameters?.data.condicionFiscal,
								region: parameters?.data.region,
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
					</div>
				) : (
					<div>
						<CircularProgress />
					</div>
				)}

				<Stack direction="column" spacing={2}>
					{editgeneralparameters.isSuccess ? (
						<Alert severity="success">Parametros generales editados con exito</Alert>
					) : editgeneralparameters.isLoading ? (
						<CircularProgress />
					) : editgeneralparameters.isError ? (
						<Alert severity="error">Error al editar parametros generales</Alert>
					) : (
						<div />
					)}

					{editprofileparameters.isSuccess ? (
						<Alert severity="success">Parametros de perfil editados con exito</Alert>
					) : editprofileparameters.isLoading ? (
						<CircularProgress />
					) : editprofileparameters.isError ? (
						<Alert severity="error">Error al editar parametros generales</Alert>
					) : (
						<div />
					)}
				</Stack>
			</Container>
		</>
	);
};
