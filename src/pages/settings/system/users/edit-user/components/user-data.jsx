import { useStore } from '@/store/use-store';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, TextInput } from '@/components/form';
import { api } from '@/services/api';
import { useEditUser } from '../context/edit-user.context';

async function edituser(data, clinicId) {
	const iduser = data[0];
	const usuariodata = data[1];
	const endpoint = `/usuarios/${clinicId}/${iduser}`;
	const response = await api.patch(endpoint, usuariodata);
	return response;
}

const useMutEditUser = () => {
	const queryClient = useQueryClient();
	const clinicId = useStore((state) => state.clinic.id);
	const mutationFn = (data) => {
		return edituser(data, clinicId);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getusers', clinicId] }),
	});
};

export const UserData = (data) => {
	const { view } = useEditUser();
	const user = data.user.user; //Anidamiento de objetos
	const mutation = useMutEditUser();
	const handleSubmit = (ev) => {
		const datosusuario = [user.id, ev];
		mutation.mutate(datosusuario);
	};

	return (
		<Slide direction="left" in={view === 'USER_DATA'} timeout={450} mountOnEnter>
			<Box sx={{ width: view === 'USER_DATA' ? '100%' : 0 }}>
				<Fade in={view === 'USER_DATA'} appear={false} timeout={200}>
					<div>
						<Form
							onSubmit={handleSubmit}
							defaultValues={{
								username: user?.username,
								password: '',
							}}
						>
							<Stack gap={4}>
								<TextInput fullWidth name="username" label="Nombre de usuario" />
								<TextInput fullWidth name="password" label="Constraseña" type="password" />
								<Button variant="contained" type="submit">
									Completar
								</Button>
							</Stack>
						</Form>
						{mutation.isError ? (
							<Alert severity="error">Error al editar persona</Alert>
						) : mutation.isLoading ? (
							<CircularProgress />
						) : mutation.isSuccess ? (
							<Alert severity="success">Usuario editado con exito!</Alert>
						) : (
							<div />
						)}
					</div>
				</Fade>
			</Box>
		</Slide>
	);
};
