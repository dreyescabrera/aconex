import { useStore } from '@/store/use-store';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Form, TextInput } from '@/components/form';
import { useEditUser } from '../hooks/use-edit-user';

const Drawer = styled(MuiDrawer)(() => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		minWidth: '300px',
		maxWidth: '50vw',
	},
}));

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EditUserInfo = ({ open, onClose }) => {
	const { user } = useStore();
	const { mutate, status, error } = useEditUser();

	const handleEdit = (formData) => {
		mutate({ userId: user.id, username: formData.username, password: formData.password });
	};

	return (
		<Drawer
			open={open}
			onClose={onClose}
			anchor="right"
			sx={{
				zIndex: 1201,
			}}
		>
			<Typography variant="h4" component="h2" sx={{ mb: 3 }}>
				Editar datos de usuario
			</Typography>

			<Form
				onSubmit={handleEdit}
				defaultValues={{
					username: user.username,
					newPassword: '',
				}}
			>
				<Stack gap={4} sx={{ mb: 2 }}>
					<TextInput name="username" label="Nombre de usuario" />
					<TextInput name="newPassword" label="Nueva contraseña" type="password" />

					<Button variant="contained" type="submit">
						Editar
					</Button>
				</Stack>
			</Form>

			{status === 'loading' && <Alert severity="info">Cargando...</Alert>}

			{status === 'error' && (
				// @ts-ignore
				<Alert severity="error">Error al editar usuario: {error.response.data.message}</Alert>
			)}

			{status === 'success' && <Alert severity="success">Usuario editado con éxito.</Alert>}
		</Drawer>
	);
};
