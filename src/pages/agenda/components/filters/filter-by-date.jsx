import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { dayJsDayList } from '@/constants/day-list';
import { useAgendaContext } from '../../context/agenda.context';
import { useAvailableDays } from '../../hooks/use-available-days';

export const FilterByDate = () => {
	const { updateFilters, filters } = useAgendaContext();
	const { data: availableDays } = useAvailableDays();
	const [inputValue, setInputValue] = useState(dayjs(filters.get('fechaDesde')));

	const handleInputChange = (date) => {
		setInputValue(date);

		const formattedDate = dayjs(date).format('MM-DD-YY');
		updateFilters({ fechaDesde: formattedDate, fechaHasta: formattedDate });
	};

	const handleWeekButtonClick = (dayNumber) => {
		const operator = inputValue.day() - dayNumber;
		const newDate = inputValue.subtract(operator, 'day');

		setInputValue(newDate);
		const formattedDate = dayjs(newDate).format('MM-DD-YY');
		updateFilters({ fechaDesde: formattedDate, fechaHasta: formattedDate });
	};

	return (
		<Paper sx={{ p: 2 }} variant="outlined">
			<Typography variant="h6" component="p" sx={{ mb: 2 }}>
				Selección de fechas
			</Typography>

			<p>Selecciona el día que quires ver y el tipo de agenda.</p>

			<Stack direction="row">
				<DatePicker
					slotProps={{
						textField: { size: 'small', fullWidth: true },
					}}
					value={inputValue}
					onChange={handleInputChange}
				/>
				<Button
					onClick={() => handleInputChange(dayjs())}
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
			<Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'space-between' }}>
				{Object.entries(dayJsDayList).map(([dayNumber, dayName]) => {
					const currentDay = inputValue;

					let boxBackground;
					let textColor = 'black';

					if (Number(dayNumber) === currentDay.day()) {
						boxBackground = 'lightgray';
					} else if (availableDays?.includes(dayName)) {
						boxBackground = '#45b619';
						textColor = 'white';
					} else {
						boxBackground = '#bf3401';
						textColor = 'white';
					}

					return (
						<Paper
							key={dayNumber}
							elevation={2}
							sx={{
								px: 1,
								py: 0.5,
								color: textColor,
								flex: 1,
								textAlign: 'center',
								backgroundColor: boxBackground,
								borderRadius: 1,
								'&:hover': {
									backgroundColor: boxBackground,
									opacity: '0.85',
								},
							}}
							component={Button}
							onClick={() => handleWeekButtonClick(Number(dayNumber))}
						>
							{dayName.substring(0, 3)}
						</Paper>
					);
				})}
			</Stack>
		</Paper>
	);
};
