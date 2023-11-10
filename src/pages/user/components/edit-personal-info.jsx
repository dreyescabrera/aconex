import { useStore } from '@/store/use-store';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DatePicker, Form, TextInput } from '@/components/form';
import { useEditProfile } from '@/hooks/use-edit-profile';

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
export const EditPersonalInfo = ({ open, onClose }) => {
	const { user, setUser } = useStore();
	const { mutate, status, error } = useEditProfile({ queryKeyToInvalidate: ['users'] });

	const handleSubmit = (formData) => {
		mutate(
			{
				perfilId: user.perfilId,
				...formData,
				nacimiento: formData.nacimiento.format('MM/DD/YY'),
			},
			{
				onSuccess: ({ data }) => {
					setUser({ perfil: data });
				},
			}
		);
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
				Editar datos personales
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					nombre: user.perfil.nombre,
					apellido: user.perfil.apellido,
					cedula: user.perfil.cedula,
					celular: user.perfil.celular,
					direccion: user.perfil.direccion,
					email: user.perfil.email,
					nacimiento: dayjs(user.perfil.nacimiento),
				}}
			>
				<Stack gap={4} sx={{ mb: 2 }}>
					<TextInput name="nombre" label="Nombre" />
					<TextInput name="apellido" label="Apellido" />
					<TextInput name="cedula" label="Cédula" />
					<TextInput name="celular" label="Celular" />
					<TextInput name="direccion" label="Dirección" />
					<TextInput name="email" label="Email" />
					<DatePicker
						name="nacimiento"
						label="Nacimiento"
						disableFuture
						slotProps={{ textField: { variant: 'standard' } }}
					/>
					<Button variant="contained" type="submit">
						Editar usuario
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
