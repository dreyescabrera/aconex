import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useDeleteHoliday } from './hooks/use-delete-holiday';
import { useHolidays } from './hooks/use-holidays';

const Holidays = () => {
	const { data: holidays, status } = useHolidays();
	const { mutate } = useDeleteHoliday();

	const handleDeleteHoliday = (id) => {
		mutate(id);
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
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={() => handleDeleteHoliday(holiday.id)}
						>
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
		</List>
	);
};

export const Component = () => {
	return (
		<>
			<Helmet>
				<title>Feriados</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Feriados
				</Typography>
				<Holidays />
				<Button variant="contained" sx={{ mt: 'auto' }} href="./nuevo">
					Agregar nuevo
				</Button>
			</Container>
		</>
	);
};
