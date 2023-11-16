import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FilterByAvailability } from './components/filters/filter-by-availability';
import { FilterByDate } from './components/filters/filter-by-date';
import { FilterByProfessional } from './components/filters/filter-by-professional';
import { FilterOptions } from './components/filters/filter-options';
import { Shifts } from './components/shifts/shifts';
import { AgendaProvider } from './context/agenda.context';

export const Component = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Helmet>
				<title>Agenda</title>
			</Helmet>
			<AgendaProvider>
				<Container>
					<Typography variant="h3" component="h1" sx={{ mb: 3 }}>
						Agenda
					</Typography>
					<Grid container spacing={4}>
						<Grid md={6}>
							<FilterByDate />
						</Grid>
						<Grid md={6}>
							<FilterByProfessional />
						</Grid>
						<Grid md={12}>
							<FilterByAvailability />
						</Grid>
					</Grid>

					<Shifts />
					<FilterOptions open={isOpen} onClose={() => setIsOpen(false)} />
				</Container>
			</AgendaProvider>
		</>
	);
};
