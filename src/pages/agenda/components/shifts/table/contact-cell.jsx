import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import { CallIcon, WhatsAppIcon } from '@/assets/svgs';

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
			<IconButton href={`https://wa.me/${phoneNumber}`} target="_blank">
				<WhatsAppIcon />
			</IconButton>
		</TableCell>
	);
}
