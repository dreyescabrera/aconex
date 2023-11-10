import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { usePatientsContext } from '../context/patient.context';
import { useDeletePatient } from '../hooks/use-delete-patient';
import { EditPatientData } from './edit-patient';
import { NewPatient } from './new-patient';

export const Patients = () => {
	const { closeDrawer, drawerToOpen, openDrawer, listToRender, handleEditPatient } =
		usePatientsContext();
	const { mutate } = useDeletePatient();

	const handleDelete = async (patientId) => {
		mutate(patientId);
	};

	if (!listToRender) {
		return (
			<Alert severity="info" sx={{ mt: 2 }}>
				Cargando pacientes...
			</Alert>
		);
	}

	return (
		<Box>
			<Button onClick={() => openDrawer('newPatient')} variant="contained" sx={{ my: 2 }}>
				Agregar Paciente
			</Button>
			<Grid container spacing={2} sx={{ mt: 1 }}>
				{listToRender?.map((patient) => (
					<Grid key={patient.id} xs={12} md={6} lg={3}>
						<Paper variant="outlined" sx={{ p: 4 }}>
							<Typography fontWeight="bold" variant="h6" component="p">
								{patient.perfil.nombre} {patient.perfil.apellido}
							</Typography>
							<Typography>Cedula: {patient.perfil.cedula} </Typography>
							<Typography>Tel: {patient.perfil.celular} </Typography>
							<Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
								<Button
									color="primary"
									variant="outlined"
									size="small"
									onClick={handleEditPatient(patient, 'editPatient')}
								>
									Editar
								</Button>
								<Button color="error" size="small" onClick={() => handleDelete(patient.id)}>
									Eliminar
								</Button>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>

			<NewPatient open={drawerToOpen === 'newPatient'} onClose={closeDrawer} />
			<EditPatientData open={drawerToOpen === 'editPatient'} onClose={closeDrawer} />
		</Box>
	);
};
