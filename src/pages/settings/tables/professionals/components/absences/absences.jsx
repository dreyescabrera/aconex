import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { api } from '@/services/api';
import { useProfessionalsContext } from '../../context/professionals.context';
import { EditAbsence } from './edit-absence';
import { NewAbsence } from './new-absence';

export const Absences = () => {
	const {
		isDrawerOpen,
		drawerToOpen,
		openDrawer,
		closeDrawer,
		handleEditAbsence,
		listToRender,
		refetch,
	} = useProfessionalsContext();

	async function deleteabscense(urlabsence) {
		const res = await api.delete(urlabsence).then(() => refetch());
		return res;
	}

	const mutation = useMutation(deleteabscense);

	const handleDeletion = (ev) => {
		const urldeletion = '/ausencias/' + ev.profesionalId.toString() + '/' + ev.id.toString();
		mutation.mutate(urldeletion);
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
			<Button
				color="primary"
				variant="contained"
				onClick={() => openDrawer('newAbsence')}
				sx={{ mt: 2, mb: 4 }}
			>
				Nueva ausencia
			</Button>
			<Grid container spacing={2}>
				{listToRender.map((professional) => (
					<Grid key={professional.perfil.celular} xs={12} md={6} lg={4}>
						<Paper variant="outlined" sx={{ p: 2 }}>
							<Typography fontWeight="bold" variant="h6" component="p">
								{professional.perfil.nombre} {professional.perfil.apellido}
							</Typography>
							{professional.ausencias.length > 0 ? (
								<div>
									{professional.ausencias.map((absence) => (
										<Grid key={absence.id}>
											<Paper variant="outlined" sx={{ p: 1 }}>
												<Typography>
													Desde {dayjs.utc(absence.vigenciaDesde).format('DD/MM/YYYY')}
												</Typography>
												<Typography sx={{ mb: 1 }}>
													Hasta {dayjs.utc(absence.vigenciaHasta).format('DD/MM/YYYY')}
												</Typography>
												<Box sx={{ display: 'flex', gap: 3 }}>
													<Button
														color="primary"
														variant="outlined"
														size="small"
														onClick={handleEditAbsence(professional, absence, 'editAbsence')}
													>
														Editar
													</Button>
													<Button
														color="error"
														size="small"
														onClick={() => handleDeletion(absence)}
													>
														Eliminar
													</Button>
												</Box>
											</Paper>
										</Grid>
									))}
								</div>
							) : (
								<div>Sin Ausencias</div>
							)}
						</Paper>
					</Grid>
				))}
			</Grid>
			<NewAbsence open={isDrawerOpen && drawerToOpen === 'newAbsence'} onClose={closeDrawer} />
			<EditAbsence open={isDrawerOpen && drawerToOpen === 'editAbsence'} onClose={closeDrawer} />
		</Box>
	);
};
