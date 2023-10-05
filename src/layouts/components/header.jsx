import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { drawerWidth } from './desktop-bar';

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
	// @ts-ignore
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

/**
 *
 * @param {object} p
 * @param {boolean} p.open
 * @param {() => void} p.toggleMobileBar
 */
export const Header = ({ toggleMobileBar, open }) => {
	const isMobile = useMediaQuery('(max-width:768px)');
	const [anchorEl, setAnchorEl] = useState(null);
	const auth = true;

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const ResponsiveAppBar = isMobile ? MuiAppBar : AppBar;

	return (
		<ResponsiveAppBar
			position="sticky"
			// @ts-ignore
			open={open}
		>
			<Toolbar sx={{ gap: isMobile ? '0.25rem' : 4 }}>
				<IconButton
					color="inherit"
					aria-label="menu"
					onClick={toggleMobileBar}
					sx={{ display: open ? 'none' : 'flex' }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					AConex
				</Typography>
				{auth && (
					<div>
						<Tooltip title="Usuario">
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</Tooltip>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
						</Menu>
					</div>
				)}
			</Toolbar>
		</ResponsiveAppBar>
	);
};
