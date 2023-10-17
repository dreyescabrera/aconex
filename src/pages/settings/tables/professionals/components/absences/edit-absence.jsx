import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { DatePicker, Form } from '@/components/form';
import { useProfessionalsContext } from '../../context/professionals.context';

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
export const EditAbsence = ({ open, onClose }) => {
	const { professionalInView } = useProfessionalsContext();

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Ausencias
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				{professionalInView?.nombre} {professionalInView?.apellido} - {professionalInView?.cedula}
			</Typography>
			<Form
				onSubmit={console.info}
				defaultValues={{
					fechaDesde: null,
					fechaHasta: null,
				}}
			>
				<Stack spacing={3}>
					<Stack direction="row" spacing={1}>
						<DatePicker name="fechaDesde" label="Fecha desde" disablePast />
						<DatePicker
							name="fechaHasta"
							label="Fecha hasta"
							rules={{ required: false }}
							disablePast
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>
		</Drawer>
	);
};
