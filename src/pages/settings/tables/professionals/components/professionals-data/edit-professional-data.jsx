import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DatePicker, Form, TextInput } from '@/components/form';
import { api } from '@/services/api';
import { useProfessionalsContext } from '../../context/professionals.context';

const Drawer = styled(MuiDrawer)(() => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		minWidth: '300px',
		maxWidth: '50vw',
	},
}));

const Mnjeditprof = ({ status }) => {
	if (status.isLoading) {
		return (
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircularProgress /> <p>Cargando...</p>
			</Stack>
		);
	}
	if (status.isSuccess) {
		return <Alert severity="success">Profesional editado con exito!</Alert>;
	}
	if (status.isError) {
		const errormensaje = status.error.response.data.message;
		return <Alert severity="error">Error al editar profesional: {errormensaje}</Alert>;
	}
};

async function editprofiledata(data) {
	const idstring = data[0].toString();
	const urldata = '/perfiles/' + idstring;
	const response = await api.patch(urldata, data[1]);
	return response;
}

const cuttimezone = (vigencia) => {
	//Recorta la zona horaria de la fecha de forma tal que dayjs no la modifique
	if (vigencia) {
		const tam1 = vigencia.length - 2;
		const fecha1 = vigencia.slice(0, tam1);

		return fecha1;
	}
	return undefined;
};

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EditProfessionalData = ({ open, onClose }) => {
	const { professionalInView } = useProfessionalsContext();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: editprofiledata,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});

	const handleSubmit = (ev) => {
		const birthday = ev.nacimiento.format('MM/DD/YYYY');
		const perfil = {
			nombre: ev.nombre,
			apellido: ev.apellido,
			cedula: ev.cedula,
			celular: ev.celular,
			direccion: ev.direccion,
			email: ev.email,
			nacimiento: birthday,
		};
		const dataperfil = [professionalInView.perfil.id, perfil];
		mutation.mutate(dataperfil);
	};

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Información personal
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				{professionalInView?.perfil.nombre} {professionalInView?.perfil.apellido} -{' '}
				{professionalInView?.perfil.cedula}
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					nombre: professionalInView?.perfil.nombre,
					apellido: professionalInView?.perfil.apellido,
					cedula: professionalInView?.perfil.cedula,
					celular: professionalInView?.perfil.celular,
					direccion: professionalInView?.perfil.direccion,
					email: professionalInView?.perfil.email,
					nacimiento: dayjs(cuttimezone(professionalInView?.perfil.nacimiento)),
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
					/>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>
			<Container sx={{ mt: 2, mb: 1 }}>
				<Mnjeditprof status={mutation} />
			</Container>
		</Drawer>
	);
};
