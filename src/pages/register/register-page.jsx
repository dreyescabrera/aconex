import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

export const Component = () => {
	return (
		<>
			<Helmet>
				<title>Registro</title>
			</Helmet>
			<Typography variant="h3" component="h1" align="center" my={1}>
				Registros
			</Typography>
			<Container
				maxWidth="xs"
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					background: '#7DDA58',
					padding: '24px',
					borderRadius: '10px',
					boxShadow:
						'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
				}}
			>
				<Stack spacing={4} sx={{ fontSize: 16, maxWidth: '80%' }}>
					<Button variant="contained" sx={{ textTransform: 'capitalize', fontSize: 16 }}>
						<Link
							href="/register/clinic"
							underline="none"
							color="inherit"
							sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}
						>
							Busco servicio
							<BusinessCenterIcon fontSize="large" />
						</Link>
					</Button>
					<Button variant="contained" sx={{ textTransform: 'capitalize', fontSize: 16 }}>
						<Link
							href="/register/user"
							underline="none"
							color="inherit"
							sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}
						>
							Ofrezco servicio/creación de usuarios
							<ManageSearchIcon fontSize="large" />
						</Link>
					</Button>
				</Stack>
			</Container>
		</>
	);
};
