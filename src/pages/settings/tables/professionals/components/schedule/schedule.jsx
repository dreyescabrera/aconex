import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { dayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';
import { EditSchedule } from './edit-schedule';

export const ProfessionalsSchedule = () => {
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
		<Grid container spacing={2} sx={{ mt: 5 }}>
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
									</Paper>
								</Grid>
							))}
						</Grid>
						<Button
							color="primary"
							variant="outlined"
							size="small"
							onClick={handleEditProfessional(professional)}
							sx={{ mt: 2 }}
						>
							Editar
						</Button>
					</Paper>
				</Grid>
			))}
			<EditSchedule open={isDrawerOpen} onClose={closeDrawer} />
		</Grid>
	);
};
