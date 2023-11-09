import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Form, TextInput } from '@/components/form';
import { api } from '@/services/api';
import { useEditUser } from '../context/edit-user.context';

const cuttimezone = (vigencia) => {
	//Recorta la zona horaria de la fecha de forma tal que dayjs no la modifique
	if (vigencia) {
		const tam1 = vigencia.length - 2;
		const fecha1 = vigencia.slice(0, tam1);

		return fecha1;
	}
	return undefined;
};

const getdate = (datestring) => {
	if (datestring) {
		const cuttedstring = cuttimezone(datestring);
		const finaldate = dayjs(cuttedstring).format('DD/MM/YYYY');
		return finaldate;
	}
	return '';
};

async function editprofile(data) {
	const idprofile = data[0];
	const prof = data[1];
	const endpoint = `/perfiles/${idprofile}`;
	const response = await api.patch(endpoint, prof);
	return response;
}

const useEditprofile = () => {
	const mutationFn = (data) => {
		return editprofile(data);
	};

	return useMutation({
		mutationFn,
	});
};

export const ProfileData = (data) => {
	const { view, updateView } = useEditUser();
	const user = data.user.user; //Anidamiento de objetos
	const mutation = useEditprofile();
	const handleSubmit = (profile) => {
		var z = profile.nacimiento.split('/');
		profile.nacimiento = z[1] + '/' + z[0] + '/' + z[2];
		const datos = [user.perfil.id, profile];
		mutation.mutate(datos);
	};

	if (mutation.isSuccess) {
		updateView('USER_DATA');
	}

	return (
		<Slide
			direction="right"
			in={view === 'PROFILE_DATA'}
			appear={false}
			timeout={450}
			unmountOnExit
		>
			<Box sx={{ width: view === 'PROFILE_DATA' ? '100%' : 0 }}>
				<Fade in={view === 'PROFILE_DATA'} appear={false} timeout={200}>
					<div>
						<Form
							onSubmit={handleSubmit}
							defaultValues={{
								nombre: user?.perfil.nombre,
								apellido: user?.perfil.apellido,
								cedula: user?.perfil.cedula,
								celular: user?.perfil.celular,
								direccion: user?.perfil.direccion,
								email: user?.perfil.email,
								nacimiento: getdate(user?.perfil.nacimiento),
							}}
						>
							<Stack gap={4}>
								<TextInput fullWidth name="nombre" label="Nombre" />
								<TextInput fullWidth name="apellido" label="Apellido" />
								<TextInput fullWidth name="cedula" label="Cédula" />
								<TextInput fullWidth name="celular" label="Celular" />
								<TextInput fullWidth name="direccion" label="Dirección" />
								<TextInput fullWidth name="email" label="Email" />
								<TextInput fullWidth name="nacimiento" label="Nacimiento" />
								<Button variant="contained" type="submit">
									Siguiente
								</Button>
							</Stack>
						</Form>
						{mutation.isError ? (
							<Alert severity="error">Error al editar persona</Alert>
						) : mutation.isLoading ? (
							<CircularProgress />
						) : (
							<div />
						)}
					</div>
				</Fade>
			</Box>
		</Slide>
	);
};
