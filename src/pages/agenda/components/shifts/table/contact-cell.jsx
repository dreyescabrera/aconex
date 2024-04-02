import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import { CallIcon, WhatsAppIcon } from '@/assets/svgs';

/**
 * @param {object} props
 * @param {string} props.phoneNumber
 */
export function ContactCell({ phoneNumber }) {
	if (phoneNumber === undefined || phoneNumber === null) {
		return (
			<TableCell sx={{ position: 'relative' }} align="center">
				<PhoneDisabledIcon />
				<Icon sx={{ height: '2vw', width: '2vw' }}>
					<img
						src="/no-logo-whatsapp.jpg"
						style={{
							height: '2vw',
							width: '2vw',
							borderRadius: '40px',
						}}
						alt="nonumber"
					/>
				</Icon>
			</TableCell>
		);
	} else {
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
}
