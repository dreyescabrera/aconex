import { useStore } from '@/store/use-store';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RightDrawer } from '@/components/drawers';
import { Form, TextInput } from '@/components/form';
import { useEditUser } from '../hooks/use-edit-user';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EditUserInfo = ({ open, onClose }) => {
	const { user } = useStore();
	const { mutate, status, error } = useEditUser();

	const handleEdit = (formData) => {
		let data = { userId: user.id };
		for (let key in formData) {
			if (formData[key] != '' && formData[key] != undefined && formData[key] != null) {
				data = { [key]: formData[key], ...data };
			}
		}
		// @ts-ignore
		mutate(data);
	};

	return (
		<RightDrawer
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
					password: '',
				}}
			>
				<Stack gap={4} sx={{ mb: 2 }}>
					<TextInput name="username" label="Nombre de usuario" />
					<TextInput
						name="password"
						label="Nueva contraseña"
						type="password"
						rules={{ required: false }}
					/>

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
		</RightDrawer>
	);
};
