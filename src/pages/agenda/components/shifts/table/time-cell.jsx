import Divider from '@mui/material/Divider';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';

/**
 * @param {object} props
 * @param {string} props.date
 */
export function TimeCell({ date }) {
	return (
		<TableCell sx={{ position: 'relative' }} align="center">
			<span>{dayjs.tz(date, 'America/Argentina/Buenos_Aires').format('HH:mm')}</span>
			<Divider orientation="vertical" absolute sx={{ height: '50%', top: '25%' }} />
		</TableCell>
	);
}
