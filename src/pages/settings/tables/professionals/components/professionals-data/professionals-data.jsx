import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useProfessionalsContext } from '../../context/professionals.context';
import { EditProfessionalData } from './edit-professional-data';

export const ProfessionalsData = () => {
	const { isDrawerOpen, closeDrawer, handleEditProfessional, listToRender } =
		useProfessionalsContext();

	if (listToRender.length === 0) {
		return (
			<Alert severity="warning" sx={{ mt: 5 }}>
				No se encontraron resultados.
			</Alert>
		);
	}

	return (
		<>
			<Grid container spacing={2} sx={{ mt: 5 }}>
				{listToRender.map((professional) => (
					<Grid key={professional.celular} xs={12} md={6} lg={4}>
						<Paper variant="outlined" sx={{ p: 2 }}>
							<Typography fontWeight="bold" variant="h6" component="p">
								{professional.nombre} {professional.apellido}
							</Typography>
							<Typography>Tel: {professional.celular}</Typography>
							<Typography>Cédula: {professional.cedula}</Typography>
							<Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
								<Button
									color="primary"
									variant="outlined"
									size="small"
									onClick={handleEditProfessional(professional)}
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
			<EditProfessionalData open={isDrawerOpen} onClose={closeDrawer} />
		</>
	);
};
