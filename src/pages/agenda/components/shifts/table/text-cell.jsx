import TableCell from '@mui/material/TableCell';

/**
 * @param {object} props
 * @param {string} props.text
 */
export function TextCell({ text }) {
	return <TableCell sx={{ textTransform: 'capitalize' }}>{text}</TableCell>;
}
