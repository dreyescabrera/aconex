import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Autocomplete, DatePicker, Form } from '@/components/form';
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
export const NewAbsence = ({ open, onClose }) => {
	const { professionals } = useProfessionalsContext();

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2" sx={{ mb: 3 }}>
				Nueva Ausencia
			</Typography>

			<Form
				onSubmit={console.info}
				defaultValues={{
					profesional: null,
					fechaDesde: null,
					fechaHasta: null,
				}}
			>
				<Stack spacing={3}>
					<Autocomplete
						options={professionals}
						getOptionLabel={(option) =>
							typeof option !== 'string' ? `${option.nombre} ${option.apellido}` : option
						}
						isOptionEqualToValue={(option, value) => option.email === value.email}
						name="profesional"
						inputProps={{ label: 'Profesional', variant: 'standard' }}
					/>
					<Stack direction="row" spacing={1}>
						<DatePicker
							name="fechaDesde"
							label="Fecha desde"
							disablePast
							slotProps={{ textField: { variant: 'standard' } }}
						/>
						<DatePicker
							name="fechaHasta"
							label="Fecha hasta"
							rules={{ required: false }}
							slotProps={{ textField: { variant: 'standard' } }}
							disablePast
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Crear
					</Button>
				</Stack>
			</Form>
		</Drawer>
	);
};
