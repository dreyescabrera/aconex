import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { FilterInput } from './components/filter-input';
import { Patients } from './components/patients';
import { PatientsProvider } from './context/patient.context';

export const Component = () => {
	return (
		<>
			<Helmet>
				<title>Pacientes</title>
			</Helmet>
			<PatientsProvider>
				<Container sx={{ mb: 4 }}>
					<Typography variant="h3" component="h1" sx={{ mb: 3 }}>
						Pacientes
					</Typography>
					<FilterInput />

					<Patients />
				</Container>
			</PatientsProvider>
		</>
	);
};
