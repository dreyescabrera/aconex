import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { dayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';
import { DeleteSchedule } from './delete-schedule';
import { EditSchedule } from './edit-schedule';
import { NewSchedule } from './new-schedule';

export const ProfessionalsSchedule = () => {
	const {
		isDrawerOpen,
		closeDrawer,
		handleEditSchedule,
		listToRender,
		openDrawer,
		drawerToOpen,
		setProfessionalInView,
		setScheduleInView,
	} = useProfessionalsContext();
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const handleDeleteSchedule = (professional, schedule) => () => {
		setOpenDeleteModal(true);
		setProfessionalInView(professional);
		setScheduleInView(schedule);
	};

	const closeDeleteModal = () => {
		setOpenDeleteModal(false);
	};

	if (!listToRender) {
		return (
			<Alert severity="info" sx={{ mt: 5 }}>
				Cargando...
			</Alert>
		);
	}

	if (listToRender?.length === 0) {
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
					<Grid key={professional.perfil.id} xs={12}>
						<Paper variant="outlined" sx={{ p: 2 }}>
							<Typography fontWeight="bold" variant="h6" component="p">
								{professional.perfil.nombre} {professional.perfil.apellido}
							</Typography>
							{professional.horarios.length > 0 ? (
								<Grid container spacing={4}>
									{professional.horarios.map((dia) => (
										<Grid key={dia.id} xs={6} sm={'auto'}>
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
												<Button
													color="error"
													variant="text"
													size="small"
													onClick={handleDeleteSchedule(professional, dia)}
												>
													Eliminar
												</Button>
											</Paper>
										</Grid>
									))}
								</Grid>
							) : (
								<div>Sin horario</div>
							)}
						</Paper>
					</Grid>
				))}
			</Grid>
			<NewSchedule open={isDrawerOpen && drawerToOpen === 'newSchedule'} onClose={closeDrawer} />
			<EditSchedule open={isDrawerOpen && drawerToOpen === 'editSchedule'} onClose={closeDrawer} />
			<DeleteSchedule open={openDeleteModal} onClose={closeDeleteModal} />
		</Box>
	);
};
