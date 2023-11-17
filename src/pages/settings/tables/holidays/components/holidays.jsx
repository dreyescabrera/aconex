import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useHolidays } from '../hooks/use-holidays';
import { DeleteHoliday } from './delete-holiday';

export const Holidays = () => {
	const { data: holidays, status } = useHolidays();
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [holidayToDelete, setHolidayToDelete] = useState(null);

	const openDeleteAlert = (holiday) => () => {
		setOpenDeleteModal(true);
		setHolidayToDelete(holiday);
	};

	const closeDeleteAlert = () => {
		setOpenDeleteModal(false);
	};

	if (status === 'loading') {
		return <Alert severity="info">Cargando...</Alert>;
	}

	if (status === 'error') {
		return (
			<Alert severity="error">
				Hubo un problema. Por favor, recargue la página o contacte a servicio al cliente .
			</Alert>
		);
	}
	return (
		<List>
			{holidays.map((holiday) => (
				<ListItem
					key={holiday.id}
					sx={{
						'&:not(:last-child)': {
							borderBottom: '1px solid #DADADAC5',
							pb: 1,
							mb: 1,
						},
					}}
					secondaryAction={
						<IconButton edge="end" aria-label="delete" onClick={openDeleteAlert(holiday)}>
							<DeleteForeverIcon />
						</IconButton>
					}
					disablePadding
				>
					<ListItemText
						primary={dayjs(holiday.fecha).format('DD [de] MMMM, YYYY')}
						secondary={holiday.descripcion}
					/>
				</ListItem>
			))}

			<DeleteHoliday
				open={openDeleteModal}
				onClose={closeDeleteAlert}
				holidayToDelete={holidayToDelete}
			/>
		</List>
	);
};
