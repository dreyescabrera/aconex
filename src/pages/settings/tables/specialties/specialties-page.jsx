import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const specialties = [
	{
		code: 111,
		description: 'Cirugía',
	},
	{
		code: 112,
		description: 'Fisioterapia',
	},
];

export const SpecialtiesPage = () => {
	return (
		<>
			<Helmet>
				<title>Especialidades</title>
			</Helmet>
			<Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
				<Typography variant="h3" component="h1">
					Especialidades
				</Typography>
				<List>
					{specialties.map((specialty) => (
						<ListItem
							key={specialty.code}
							sx={{
								'&:not(:last-child)': {
									borderBottom: '1px solid #DADADAC5',
									pb: 1,
									mb: 1,
								},
							}}
							disablePadding
						>
							<ListItemText
								primary={specialty.description}
								secondary={`Código: ${specialty.code}`}
							/>
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
