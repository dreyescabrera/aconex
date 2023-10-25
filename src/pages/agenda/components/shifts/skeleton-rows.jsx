import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const SkeletonRows = () => {
	const totalRows = 8;
	const iterable = new Array(totalRows).fill();

	return (
		<>
			{iterable.map((_, i) => (
				<TableRow key={i}>
					<TableCell>
						<Skeleton />
					</TableCell>
					<TableCell>
						<Skeleton />
					</TableCell>
					<TableCell>
						<Skeleton />
					</TableCell>
					<TableCell>
						<Skeleton />
					</TableCell>
				</TableRow>
			))}
		</>
	);
};
