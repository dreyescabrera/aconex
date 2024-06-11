import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RightDrawer } from '@/components/drawers';
import { DatePicker, Form } from '@/components/form';
import { api } from '@/services/api';
import { useProfessionalsContext } from '../../context/professionals.context';

const Mensajeedit = ({ status }) => {
	if (status.isLoading) {
		return (
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircularProgress /> <p>Cargando...</p>
			</Stack>
		);
	}
	if (status.isSuccess) {
		return <Alert severity="success">Ausencia editada con exito!</Alert>;
	}
	if (status.isError) {
		return <Alert severity="error">Error al editar</Alert>;
	}
};

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EditAbsence = ({ open, onClose }) => {
	const { professionalInView, absenceInView } = useProfessionalsContext();

	async function updateabsence(listdata) {
		const res = await api.patch(listdata[0], listdata[1]);
		return res;
	}
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: updateabsence,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});

	const handleEdit = (ev) => {
		const idstring = absenceInView.id.toString();
		const profid = absenceInView.profesionalId.toString();
		const urldata = '/ausencias/' + profid + '/' + idstring;
		let objdata = {
			vigenciaDesde: ev.fechaDesde.format('MM/DD/YYYY'),
			vigenciaHasta: ev.fechaHasta.format('MM/DD/YYYY'),
		};
		const datos = [urldata, objdata];
		mutation.mutate(datos);
	};

	return (
		<RightDrawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Ausencias
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				{professionalInView?.perfil.nombre} {professionalInView?.perfil.apellido} -{' '}
				{professionalInView?.perfil.cedula}
			</Typography>
			<Form
				onSubmit={handleEdit}
				defaultValues={{
					fechaDesde: null,
					fechaHasta: null,
				}}
			>
				<Stack spacing={3}>
					<Stack direction="row" spacing={1}>
						<DatePicker
							name="fechaDesde"
							label="Fecha desde"
							disablePast
							slotProps={{ textField: { variant: 'standard' } }}
							format="DD/MM/YYYY"
						/>
						<DatePicker
							name="fechaHasta"
							label="Fecha hasta"
							rules={{ required: false }}
							disablePast
							slotProps={{ textField: { variant: 'standard' } }}
							format="DD/MM/YYYY"
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>
			<Container sx={{ mt: 2, mb: 1 }}>
				<Mensajeedit status={mutation} />
			</Container>
		</RightDrawer>
	);
};
