import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useProfessionals } from '@/hooks/use-professionals';
import { useProfessionalsContext } from '../context/professionals.context';

export const FilterInput = () => {
	const { data: professionals } = useProfessionals();
	const { filterQuery, handleFilterChange, handleAutocompleteClick } = useProfessionalsContext();

	return (
		<Autocomplete
			freeSolo
			options={professionals ?? []}
			getOptionLabel={(option) =>
				typeof option !== 'string' ? `${option.perfil.nombre} ${option.perfil.apellido}` : option
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
