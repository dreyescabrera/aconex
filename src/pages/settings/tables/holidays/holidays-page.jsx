import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const holidays = [
	{
		day: 'Lunes 25/09/23',
		description: 'Entrega prototipo',
	},
	{
		day: 'Martes 26/09/23',
		description: 'Entrega prototipo',
	},
];

export const HolidaysPage = () => {
	return (
		<>
			<Helmet>
				<title>Feriados</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Feriados
				</Typography>
				<List>
					{holidays.map((holiday) => (
						<ListItem
							key={holiday.day}
							sx={{
								'&:not(:last-child)': {
									borderBottom: '1px solid #DADADAC5',
									pb: 1,
									mb: 1,
								},
							}}
							secondaryAction={
								<IconButton edge="end" aria-label="delete">
									<DeleteForeverIcon />
								</IconButton>
							}
							disablePadding
						>
							<ListItemText primary={holiday.day} secondary={holiday.description} />
						</ListItem>
					))}
				</List>
				<Button variant="contained" sx={{ mt: 'auto' }} href="./nuevo">
					Agregar nuevo
				</Button>
			</Container>
		</>
	);
};
