import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DesktopBar, Footer, Header, MobileBar } from './components';

export const MainLayout = () => {
	const [isOpenMobile, setIsOpenMobile] = useState(false);
	const isMobile = useMediaQuery('(max-width:768px)');
	const { pathname } = useLocation();
	const toggleMobileBar = () => {
		setIsOpenMobile((prev) => !prev);
	};

	const headerHeight = isMobile ? 56 : 64;

	return (
		<>
			<Header toggleMobileBar={toggleMobileBar} open={isOpenMobile} />
			<Box sx={{ display: 'flex', minHeight: `calc(100vh - ${headerHeight}px)` }}>
				{isMobile ? (
					<MobileBar onClose={toggleMobileBar} open={isOpenMobile} />
				) : (
					<DesktopBar onClose={toggleMobileBar} open={isOpenMobile} />
				)}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						gap: 4,
						mt: 4,
					}}
				>
					{isMobile && pathname !== '/' ? (
						<Container>
							<Button
								href=".."
								startIcon={<KeyboardReturnIcon />}
								variant="outlined"
								sx={{ width: 'max-content' }}
							>
								Volver
							</Button>
						</Container>
					) : null}
					<main>
						<Outlet />
					</main>
					<Footer />
				</Box>
			</Box>
		</>
	);
};
