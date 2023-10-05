import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navLinks } from '../constants/nav-links';
import { DrawerHeader } from './drawer-header';

/**
 * @param {object} p
 * @param {() => void} p.onClose
 * @param {boolean} p.open
 */
export const MobileBar = ({ onClose, open }) => {
	return (
		<Drawer open={open} onClose={onClose} variant="temporary">
			<DrawerHeader>
				<IconButton onClick={onClose}>
					<ChevronLeftIcon />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<nav>
				<List>
					{navLinks.map((link) => (
						<ListItem disablePadding key={link.id} sx={{ display: 'block' }}>
							<ListItemButton sx={{ py: 2 }}>
								<ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{link.icon}</ListItemIcon>
								<ListItemText primary={link.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</nav>
		</Drawer>
	);
};
