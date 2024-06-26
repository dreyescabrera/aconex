import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';

/**
 * @param {object} props
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} [props.onClick]
 * @param {boolean} [props.disabled]
 */
export function OptionsCell({ onClick, disabled }) {
	return (
		<TableCell sx={{ position: 'relative' }} align="right">
			<IconButton onClick={onClick} disabled={disabled}>
				<MoreVertIcon />
			</IconButton>
		</TableCell>
	);
}
