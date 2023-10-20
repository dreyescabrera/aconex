import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { usePatientsContext } from '../context/patient.content';
import { EditPatientData } from '../patient-data/edit-patient-data';
import { NewPatient } from '../patient-data/new-patient';

export const PatientsData = () => {
	const { closeDrawer, drawerToOpen, openDrawer, listToRender, handleEditPatient } =
		usePatientsContext();
	return (
		<Box>
			<Grid container spacing={2} sx={{ mt: 2 }}>
				{listToRender.map((patient) => (
					<Grid key={patient.email} xs={12} md={6} lg={3}>
						<Paper variant="outlined" sx={{ p: 4 }}>
							<Typography fontWeight="bold" variant="h6" component="p">
								{patient.nombre} {patient.apellido}
							</Typography>
							<Typography>Cedula: {patient.cedula} </Typography>
							<Typography>Tel: {patient.celular} </Typography>
							<Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
								<Button
									color="primary"
									variant="outlined"
									size="small"
									onClick={handleEditPatient(patient, 'editPatient')}
								>
									Editar
								</Button>
								<Button color="error" size="small">
									Eliminar
								</Button>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Button onClick={() => openDrawer('newPatient')} variant="contained" sx={{ mt: 4, mb: 4 }}>
					Agregar Paciente
				</Button>
			</Box>
			<NewPatient open={drawerToOpen === 'newPatient'} onClose={closeDrawer} />
			<EditPatientData open={drawerToOpen === 'editPatient'} onClose={closeDrawer} />
		</Box>
	);
};
