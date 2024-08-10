import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import { CallIcon, WhatsAppIcon } from '@/assets/svgs';

/**
 * @param {object} props
 * @param {object} props.date
 * @param {string} props.phoneNumber
 * @param {string} props.name
 */
export function ContactCell({ phoneNumber, name, date }) {
	let nombrepaciente = '';
	let fecha = '';
	let temphour = '';
	if (name) {
		nombrepaciente = `${name}%20`;
	}

	if (date) {
		temphour = dayjs.tz(date, 'America/Argentina/Buenos_Aires').format('HH:mm');
		let dia = dayjs.tz(date, 'America/Argentina/Buenos_Aires').locale('es').format('dddd');
		let dia1 = dayjs.tz(date, 'America/Argentina/Buenos_Aires').locale('es').format('DD');
		let mes = dayjs.tz(date, 'America/Argentina/Buenos_Aires').locale('es').format('MMMM');
		fecha = `%20del%20día%20${dia}%20${dia1}%20de%20${mes}%20a%20las%20${temphour}hs.`;
	}

	if (phoneNumber === undefined || phoneNumber === null) {
		return (
			<TableCell sx={{ position: 'relative' }} align="center">
				<Icon sx={{ height: '1.4em', width: '1.4em' }}>
					<PhoneDisabledIcon />
				</Icon>
				<Icon sx={{ height: '1.4em', width: '1.5em' }}>
					<img
						src="/no-logo-whatsapp.jpg"
						style={{
							height: '1em',
							width: '1em',
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
				<IconButton
					href={`https://wa.me/${phoneNumber}?text=Hola%20${nombrepaciente}como%20estas!%20Te%20contactamos%20para%20recordar%20tu%20turno${fecha}%20No%20dudes%20en%20contactarte%20si%20deseas%20cancelar%20o%20reprogramar%20tu%20turno.%20Te%20esperamos!`}
					target="_blank"
				>
					<WhatsAppIcon />
				</IconButton>
			</TableCell>
		);
	}
}
