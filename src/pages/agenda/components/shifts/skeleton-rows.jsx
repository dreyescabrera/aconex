import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const SkeletonRows = () => {
	const totalRows = 12;
	const iterable = new Array(totalRows).fill();

	return iterable.map((_, i) => (
		<TableRow key={i}>
			<TableCell>
				<Skeleton />
			</TableCell>
			<TableCell colSpan={3}>
				<Skeleton />
			</TableCell>
			<TableCell colSpan={3}>
				<Skeleton />
			</TableCell>
		</TableRow>
	));
};
