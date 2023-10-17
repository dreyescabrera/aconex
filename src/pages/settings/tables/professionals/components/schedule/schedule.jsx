import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { dayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';
import { EditSchedule } from './edit-schedule';
import { NewSchedule } from './new-schedule';

export const ProfessionalsSchedule = () => {
	const { isDrawerOpen, closeDrawer, handleEditSchedule, listToRender, openDrawer, drawerToOpen } =
		useProfessionalsContext();

	if (listToRender.length === 0) {
		return (
			<Alert severity="warning" sx={{ mt: 5 }}>
				No se encontraron resultados.
			</Alert>
		);
	}

	return (
		<Box>
			<Button onClick={() => openDrawer('newSchedule')} variant="contained" sx={{ mt: 2, mb: 4 }}>
				Nuevo horario
			</Button>
			<Grid container spacing={2}>
				{listToRender.map((professional) => (
					<Grid key={professional.celular} xs={12}>
						<Paper variant="outlined" sx={{ p: 2 }}>
							<Typography fontWeight="bold" variant="h6" component="p">
								{professional.nombre} {professional.apellido}
							</Typography>
							<Grid container spacing={4}>
								{professional.horarios.map((dia) => (
									<Grid key={dia.nroDia} xs={6} sm={'auto'}>
										<Paper variant="outlined" sx={{ p: 1 }}>
											<Typography>{dayList[dia.nroDia]}</Typography>
											<Typography color="#666">
												{dia.horaDesde} - {dia.horaHasta}
											</Typography>
											<Button
												color="primary"
												variant="text"
												size="small"
												onClick={handleEditSchedule(professional, dia, 'editSchedule')}
											>
												Editar
											</Button>
											<Button color="error" variant="text" size="small">
												Eliminar
											</Button>
										</Paper>
									</Grid>
								))}
							</Grid>
						</Paper>
					</Grid>
				))}
				<NewSchedule open={isDrawerOpen && drawerToOpen === 'newSchedule'} onClose={closeDrawer} />
				<EditSchedule
					open={isDrawerOpen && drawerToOpen === 'editSchedule'}
					onClose={closeDrawer}
				/>
			</Grid>
		</Box>
	);
};
