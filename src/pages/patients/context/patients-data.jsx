import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { usePatientsContext } from '../context/patient.content';
import { EditPatientData } from '../patient-data/edit-patient-data';
import { NewPatient } from '../patient-data/new-patient';

export const PatientsData = () => {
	const { isDrawerOpen, closeDrawer, drawerToOpen, openDrawer } = usePatientsContext();
	return (
		<Box>
			<Grid container spacing={2} sx={{ mt: 2 }}>
				<Grid xs={12} md={6} lg={3}>
					<Paper variant="outlined" sx={{ p: 4 }}>
						<Typography>Nombre: </Typography>
						<Typography>Apellido: </Typography>
						<Typography>Teléfono: </Typography>
						<Typography>Dirección: </Typography>
						<Typography>DNI: </Typography>
						<Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
							<Button
								color="primary"
								variant="outlined"
								size="small"
								onClick={() => openDrawer('editPatient')}
							>
								Editar
							</Button>
							<Button color="error" size="small">
								Eliminar
							</Button>
						</Box>
					</Paper>
				</Grid>
			</Grid>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Button onClick={() => openDrawer('newPatient')} variant="contained" sx={{ mt: 4, mb: 4 }}>
					Agregar nuevo
				</Button>
			</Box>
			<NewPatient open={isDrawerOpen && drawerToOpen === 'newPatient'} onClose={closeDrawer} />
			<EditPatientData
				open={isDrawerOpen && drawerToOpen === 'editPatient'}
				onClose={closeDrawer}
			/>
		</Box>
	);
};

export default PatientsData;
