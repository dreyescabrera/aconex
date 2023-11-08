import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { DatePicker, Form, TextInput } from '@/components/form';
import { api } from '@/services/api';
import { useProfessionalsContext } from '../../context/professionals.context';

const Messaged = ({ status, cargando, exito, erro }) => {
	if (status.isLoading) {
		return (
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircularProgress /> <p>{cargando}</p>
			</Stack>
		);
	}
	if (status.isSuccess) {
		return <Alert severity="success">{exito}</Alert>;
	}
	if (status.isError) {
		return <Alert severity="error">{erro}</Alert>;
	}
};

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
export const NewProfessionalData = ({ open, onClose }) => {
	const { refetch } = useProfessionalsContext();

	async function createprofessional(response) {
		const id = response.data.data.id;
		const cid = 1; //Es Necesario especificar la clinica
		const profesional = { clinicaId: cid, perfilId: id };
		const res = await api.post('/profesionales', profesional).then(() => refetch());
		return res;
	}
	const mutationcreateprofessional = useMutation(createprofessional);

	async function createprofile(data) {
		const res = await api
			.post('/perfiles', data)
			.then((response) => mutationcreateprofessional.mutate(response));
		return res;
	}
	const mutationcreateprofile = useMutation(createprofile);

	const handleSubmit = (ev) => {
		const cellphone = parseInt(ev.celular);
		const ced = parseInt(ev.cedula);
		const birthday = ev.nacimiento.format('MM/DD/YYYY');
		const data = {
			nombre: ev.nombre,
			apellido: ev.apellido,
			cedula: ced,
			celular: cellphone,
			direccion: ev.direccion,
			email: ev.email,
			nacimiento: birthday,
		};

		mutationcreateprofile.mutate(data);
	};

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Información personal
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					nombre: '',
					apellido: '',
					cedula: '',
					celular: '',
					direccion: '',
					email: '',
					nacimiento: null,
				}}
			>
				<Stack spacing={3}>
					<TextInput name="nombre" label="Nombre" />
					<TextInput name="apellido" label="Apellido" />
					<TextInput name="cedula" label="Número de Cédula" />
					<TextInput name="celular" label="Celular" />
					<TextInput name="direccion" label="Dirección" />
					<TextInput name="email" label="Correo electrónico" />
					<DatePicker
						name="nacimiento"
						label="Fecha de nacimiento"
						slotProps={{ textField: { variant: 'standard' } }}
						disableFuture
						format="DD/MM/YYYY"
					/>
					<Button type="submit" variant="contained">
						Crear
					</Button>
				</Stack>
			</Form>
			<Messaged
				status={mutationcreateprofile}
				cargando="Creando Perfil..."
				exito="Perfil Creado."
				erro="Error al crear perfil"
			/>
			<Messaged
				status={mutationcreateprofessional}
				cargando="Creando Profesional..."
				exito="Profesional creado con exito!"
				erro="Error al crear Profesional"
			/>
		</Drawer>
	);
};
