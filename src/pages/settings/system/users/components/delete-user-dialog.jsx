import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteUser } from '../../hooks/use-delete-user';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.usuario
 */
export const DeleteUserDialog = ({ open, onClose, usuario }) => {
	const { mutate } = useDeleteUser();
	const handleDeleteUser = () => {
		mutate(usuario.id);
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Eliminar usuario</DialogTitle>
			<DialogContent>Seguro que deseas eliminar a {usuario.username}</DialogContent>
			<DialogActions>
				<Button onClick={handleDeleteUser} color="error">
					Eliminar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
