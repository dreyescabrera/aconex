import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Autocomplete, DatePicker, Form } from '@/components/form';
import { useProfessionalsContext } from '../../context/professionals.context';
import { useCreateAbsence } from '../../hooks/use-create-absence';

const Drawer = styled(MuiDrawer)(() => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		minWidth: '300px',
		maxWidth: '50vw',
	},
}));

const Mensajeabsence = ({ status }) => {
	if (status === 'loading') {
		return (
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircularProgress /> <p>Cargando...</p>
			</Stack>
		);
	}
	if (status === 'success') {
		return <Alert severity="success">Ausencia agregada con exito!</Alert>;
	}
	if (status === 'error') {
		return <Alert severity="error">Error al agregar Ausencia</Alert>;
	}
};

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const NewAbsence = ({ open, onClose }) => {
	const { mutate, status } = useCreateAbsence();
	const { listToRender } = useProfessionalsContext();

	const handleSubmit = (absence) => {
		const formattedFrom = absence.fechaDesde.format('MM/DD/YYYY');
		const formattedTo = absence.fechaHasta.format('MM/DD/YYYY');

		mutate({
			profesionalId: absence.profesional.id,
			vigenciaDesde: formattedFrom,
			vigenciaHasta: formattedTo,
		});
	};

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2" sx={{ mb: 3 }}>
				Nueva Ausencia
			</Typography>
			<Form
				onSubmit={handleSubmit}
				defaultValues={{
					profesional: null,
					fechaDesde: null,
					fechaHasta: null,
				}}
			>
				<Stack spacing={3}>
					<Autocomplete
						options={listToRender}
						getOptionLabel={(option) =>
							typeof option !== 'string'
								? `${option.perfil.nombre} ${option.perfil.apellido}`
								: option
						}
						isOptionEqualToValue={(option, value) => option.perfil.email === value.perfil.email}
						name="profesional"
						inputProps={{ label: 'Profesional', variant: 'standard' }}
					/>
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
							slotProps={{ textField: { variant: 'standard' } }}
							disablePast
							format="DD/MM/YYYY"
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Crear
					</Button>
				</Stack>
			</Form>
			<Container sx={{ mt: 2, mb: 1 }}>
				<Mensajeabsence status={status} />
			</Container>
		</Drawer>
	);
};
