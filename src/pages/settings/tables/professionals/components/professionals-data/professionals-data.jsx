import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useProfessionalsContext } from '../../context/professionals.context';
import { DeleteProfessional } from './delete-professional';
import { EditProfessionalData } from './edit-professional-data';
import { NewProfessionalData } from './new-professional';

export const ProfessionalsData = () => {
	const {
		isDrawerOpen,
		closeDrawer,
		handleEditProfessional,
		listToRender,
		openDrawer,
		drawerToOpen,
		setProfessionalInView,
	} = useProfessionalsContext();
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const handleDeleteProfessional = (professional) => () => {
		setOpenDeleteModal(true);
		setProfessionalInView(professional);
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
			<Box>
				<Button
					onClick={() => openDrawer('newProfessional')}
					variant="contained"
					sx={{ mt: 2, mb: 2 }}
				>
					Crear profesional
				</Button>
				<Alert severity="warning" sx={{ mt: 5 }}>
					No se encontraron resultados.
				</Alert>
				<NewProfessionalData
					open={isDrawerOpen && drawerToOpen === 'newProfessional'}
					onClose={closeDrawer}
				/>
			</Box>
		);
	}

	return (
		<Box>
			<Button
				onClick={() => openDrawer('newProfessional')}
				variant="contained"
				sx={{ mt: 2, mb: 4 }}
			>
				Nuevo profesional
			</Button>
			<Grid container spacing={2}>
				{listToRender?.map((professional) => (
					<Grid key={professional.perfil.celular} xs={12} md={6} lg={4}>
						<Paper variant="outlined" sx={{ p: 2 }}>
							<Typography fontWeight="bold" variant="h6" component="p">
								{professional.perfil.nombre} {professional.perfil.apellido}
							</Typography>
							<Typography>Tel: {professional.perfil.celular}</Typography>
							<Typography>Cédula: {professional.perfil.cedula}</Typography>
							<Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
								<Button
									color="primary"
									variant="outlined"
									size="small"
									onClick={handleEditProfessional(professional, 'editProfessional')}
								>
									Editar
								</Button>
								<Button color="error" size="small" onClick={handleDeleteProfessional(professional)}>
									Eliminar
								</Button>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>
			<NewProfessionalData
				open={isDrawerOpen && drawerToOpen === 'newProfessional'}
				onClose={closeDrawer}
			/>
			<EditProfessionalData
				open={isDrawerOpen && drawerToOpen === 'editProfessional'}
				onClose={closeDrawer}
			/>
			<DeleteProfessional open={openDeleteModal} onClose={closeDeleteModal} />
		</Box>
	);
};
