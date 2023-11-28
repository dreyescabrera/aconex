import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import dayjs from 'dayjs';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.usuario
 */
export const UserDialog = ({ open, onClose, usuario }) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>{`Detalles de usuario: ${usuario.perfil.nombre} ${usuario.perfil.apellido}`}</DialogTitle>
			<DialogContent dividers>
				<List disablePadding>
					<ListItem disableGutters disablePadding>
						<ListItemText primary="Nombre" secondary={`${usuario.perfil.nombre}`} />
					</ListItem>
					<ListItem disableGutters disablePadding>
						<ListItemText primary="Apellido" secondary={`${usuario.perfil.apellido}`} />
					</ListItem>
					<ListItem disableGutters disablePadding>
						<ListItemText primary="Número de DNI o Pasaporte" secondary={usuario.perfil.cedula} />
					</ListItem>
					<ListItem disableGutters disablePadding>
						<ListItemText primary="Dirección" secondary={usuario.perfil.direccion} />
					</ListItem>
					<ListItem disableGutters disablePadding>
						<ListItemText primary="Correo electrónico" secondary={usuario.perfil.email} />
					</ListItem>

					<ListItem disableGutters disablePadding>
						<ListItemText
							primary="Fecha de Nacimiento"
							secondary={dayjs(usuario.perfil.nacimiento).format('DD [de] MMMM, YYYY')}
							sx={{ textTransform: 'capitalize' }}
						/>
					</ListItem>
				</List>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cerrar</Button>
			</DialogActions>
		</Dialog>
	);
};
