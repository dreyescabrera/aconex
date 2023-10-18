import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { FilterInput } from '../components/filter-input';
import { PatientsProvider } from '../context/patient.content';
import PatientsData from '../context/patients-data';

const PatientPage = () => {
	return (
		<>
			<Helmet>
				<title>Pacientes</title>
			</Helmet>
			<PatientsProvider>
				<Container sx={{ mb: 4 }}>
					<Typography variant="h3" component="h1">
						Pacientes
					</Typography>
					<FilterInput />
					<PatientsData />
				</Container>
			</PatientsProvider>
		</>
	);
};

export default PatientPage;
