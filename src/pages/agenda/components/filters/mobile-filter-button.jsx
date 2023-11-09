import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';

/**
 * @param {object} props
 * @param {() => void} props.openFilters
 */
export const MobileFilterButton = ({ openFilters }) => {
	return (
		<Button
			variant="outlined"
			endIcon={<FilterListIcon />}
			color="inherit"
			size="small"
			onClick={openFilters}
			sx={{ textTransform: 'capitalize', px: 2, fontSize: '14px', borderColor: '#0000003D' }}
		>
			Filtrar
		</Button>
	);
};
