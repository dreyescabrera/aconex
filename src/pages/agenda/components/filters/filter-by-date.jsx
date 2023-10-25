import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DatePicker, Form } from '@/components/form';
import { dayList } from '@/constants/day-list';
import { useAgendaContext } from '../../context/agenda.context';

export const FilterByDate = () => {
	const { updateFilters } = useAgendaContext();

	const handleChange = (date) => {
		const formattedDate = dayjs(date).format('MM/DD/YY');
		updateFilters({ fechaDesde: formattedDate, fechaHasta: formattedDate });
	};

	return (
		<Paper sx={{ p: 2 }} variant="outlined">
			<Typography variant="h6" component="p" sx={{ mb: 2 }}>
				Selección de fechas
			</Typography>

			<p>Selecciona el día que quires ver y el tipo de agenda.</p>

			<Form defaultValues={{ date: dayjs() }} onSubmit={console.info}>
				<Stack direction="row">
					<DatePicker
						name="date"
						slotProps={{
							textField: { size: 'small', fullWidth: true },
						}}
						onChange={handleChange}
					/>
					<Button
						type="reset"
						sx={{
							borderRadius: 1,
							ml: 2,
							backgroundColor: (theme) => theme.palette.primary.main,
							color: 'white',
							'&:hover': {
								backgroundColor: (theme) => theme.palette.primary.dark,
							},
						}}
					>
						Hoy
					</Button>
				</Stack>
			</Form>
			<Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'space-between' }}>
				{Object.values(dayList).map((day) => (
					<Paper
						key={day}
						elevation={3}
						sx={{
							px: 1,
							py: 0.5,
							flex: 1,
							textAlign: 'center',
							color: '#444',
							borderRadius: 1,
						}}
					>
						{day.substring(0, 3).toUpperCase()}
					</Paper>
				))}
			</Stack>
		</Paper>
	);
};
