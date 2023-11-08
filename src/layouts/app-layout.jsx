import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Outlet, redirect, useLocation } from 'react-router-dom';
import { DesktopBar, Footer, Header, MobileBar } from './components';

export const AppLayout = () => {
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
					<Box component="main" sx={{ flexGrow: 1 }}>
						<Outlet />
					</Box>
					<Footer />
				</Box>
			</Box>
		</>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
	const isUserLoggedIn = sessionStorage.getItem('loggedUserData');

	if (!isUserLoggedIn) {
		return redirect('/login');
	}

	return null;
};
