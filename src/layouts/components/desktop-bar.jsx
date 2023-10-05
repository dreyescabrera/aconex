import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { navLinks } from '../constants/nav-links';
import { DrawerHeader } from './drawer-header';

export const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	// @ts-ignore
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	})
);

/**
 * @param {object} p
 * @param {() => void} p.onClose
 * @param {boolean} p.open
 */
export const DesktopBar = ({ onClose, open }) => {
	return (
		<Drawer open={open} variant="permanent">
			<DrawerHeader>
				<IconButton onClick={onClose}>
					<ChevronLeftIcon />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<nav>
				<List>
					{navLinks.map((link) => (
						<ListItem key={link.id} disablePadding sx={{ display: 'block' }}>
							<ListItemButton
								href={link.href}
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
									{link.icon}
								</ListItemIcon>
								<ListItemText sx={{ opacity: open ? 1 : 0, position: open ? 'block' : 'absolute' }}>
									{link.text}
								</ListItemText>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</nav>
		</Drawer>
	);
};
