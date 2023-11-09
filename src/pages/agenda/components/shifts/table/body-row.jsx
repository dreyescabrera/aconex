import TableRow from '@mui/material/TableRow';

/**
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {import('react').MouseEventHandler<HTMLTableRowElement>} [props.onClick]
 */
export const BodyRow = ({ children, onClick }) => {
	return (
		<TableRow
			sx={{
				textTransform: 'capitalize',
				'&:last-child td, &:last-child th': { border: 0 },
			}}
			onClick={onClick}
		>
			{children}
		</TableRow>
	);
};
