import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { usePatientsContext } from '../context/patient.context';
import { DeletePatient } from './delete-patient';
import { EditPatientData } from './edit-patient';
import { NewPatient } from './new-patient';

export const Patients = () => {
	const { closeDrawer, drawerToOpen, openDrawer, listToRender, handleEditPatient } =
		usePatientsContext();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [patientToDelete, setPatientToDelete] = useState(null);

	const openDeleteModal = (patient) => () => {
		setIsDeleteModalOpen(true);
		setPatientToDelete(patient);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
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
							<Typography>DNI/Pasaporte: {patient.perfil.cedula} </Typography>
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
								<Button color="error" size="small" onClick={openDeleteModal(patient)}>
									Eliminar
								</Button>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>

			<NewPatient open={drawerToOpen === 'newPatient'} onClose={closeDrawer} />
			<EditPatientData open={drawerToOpen === 'editPatient'} onClose={closeDrawer} />
			<DeletePatient
				open={isDeleteModalOpen}
				onClose={closeDeleteModal}
				patientToDelete={patientToDelete}
			/>
		</Box>
	);
};
