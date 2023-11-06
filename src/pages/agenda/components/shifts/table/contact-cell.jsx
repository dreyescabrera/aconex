import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import { CallIcon, WhatsappIcon } from '@/assets/svgs';

/**
 * @param {object} props
 * @param {string} props.phoneNumber
 */
export function ContactCell({ phoneNumber }) {
	return (
		<TableCell sx={{ position: 'relative' }} align="center">
			<IconButton href={`tel:${phoneNumber}`}>
				<CallIcon />
			</IconButton>
			<IconButton>
				<WhatsappIcon />
			</IconButton>
		</TableCell>
	);
}
