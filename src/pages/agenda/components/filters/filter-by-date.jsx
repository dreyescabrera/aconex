/* eslint-disable no-restricted-imports */
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
	const isSmallScreen = useMediaQuery('(max-width:563px)');

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
		<Paper
			variant="outlined"
			sx={{
				p: 2,
				width: '100%',
				maxWidth: '600px',
				margin: '0 auto',
				...(isSmallScreen && { p: 1 }),
			}}
		>
			<Typography variant="h6" component="p" sx={{ mb: 2 }}>
				Selección de fechas
			</Typography>

			<p>Selecciona el día que quieres ver y el tipo de agenda.</p>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={8}>
					<DatePicker
						slotProps={{
							textField: { size: 'small', fullWidth: true },
						}}
						value={inputValue}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Button
						onClick={() => handleInputChange(dayjs())}
						sx={{
							width: '100%',
							borderRadius: 1,
							backgroundColor: (theme) => theme.palette.primary.main,
							color: 'white',
							'&:hover': {
								backgroundColor: (theme) => theme.palette.primary.dark,
							},
						}}
					>
						Hoy
					</Button>
				</Grid>
			</Grid>
			<Grid container spacing={1} sx={{ mt: 2 }}>
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
						<Grid
							item
							xs={3}
							sm={2}
							md={1.7}
							key={dayNumber}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<Paper
								key={dayNumber}
								elevation={2}
								sx={{
									px: 3,
									py: 0.7,
									color: textColor,
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
						</Grid>
					);
				})}
			</Grid>
		</Paper>
	);
};
