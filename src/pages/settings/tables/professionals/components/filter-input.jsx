import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useProfessionalsContext } from '../context/professionals.context';

export const FilterInput = () => {
	const { professionals, filterQuery, handleFilterChange, handleAutocompleteClick } =
		useProfessionalsContext();

	return (
		<Autocomplete
			freeSolo
			options={professionals}
			getOptionLabel={(option) =>
				typeof option !== 'string' ? `${option.nombre} ${option.apellido}` : option
			}
			onChange={handleAutocompleteClick}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Buscar profesional"
					value={filterQuery}
					onChangeCapture={handleFilterChange}
					name="professional"
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			)}
		/>
	);
};
