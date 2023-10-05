import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const Footer = () => {
	return (
		<Box component="footer" sx={{ borderTop: 'solid 1px #CCC6', py: 3, mt: 'auto' }}>
			<Container>
				<Typography color="#555">© 2023 AConex. Todos los Derechos Reservados.</Typography>
			</Container>
		</Box>
	);
};
