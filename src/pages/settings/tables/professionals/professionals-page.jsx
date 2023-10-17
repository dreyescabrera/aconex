import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Absences, FilterInput, ProfessionalsData, ProfessionalsSchedule } from './components';
import { ProfessionalsProvider } from './context/professionals.context';

export const ProfessionalsPage = () => {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (ev, newValue) => {
		setTabValue(newValue);
	};

	return (
		<>
			<Helmet>
				<title>Profesionales</title>
			</Helmet>
			<ProfessionalsProvider>
				<Container>
					<Typography variant="h3" component="h1">
						Profesionales
					</Typography>

					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						sx={{ borderBottom: '1px solid lightgray', justifyContent: 'space-between', mb: 4 }}
					>
						<Tab label="Datos" />
						<Tab label="Horarios" />
						<Tab label="Ausencias" />
					</Tabs>
					<FilterInput />
					{tabValue === 0 && <ProfessionalsData />}
					{tabValue === 1 && <ProfessionalsSchedule />}
					{tabValue === 2 && <Absences />}
				</Container>
			</ProfessionalsProvider>
		</>
	);
};
