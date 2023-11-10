import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

export const Component = () => {
	return (
		<>
			<AppBar position="sticky" sx={{ mb: 4 }}>
				<Container>
					<Toolbar disableGutters>
						<Typography variant="h6" component="div">
							AConex
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
			<Outlet />
		</>
	);
};
