import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { usePatientsContext } from '../context/patient.context';

export const FilterInput = () => {
	const { patients, filterQuery, handleFilterChange, handleAutocompleteClick } =
		usePatientsContext();
	return (
		<Autocomplete
			freeSolo
			options={patients ?? []}
			getOptionLabel={(option) =>
				typeof option !== 'string' ? `${option.perfil.nombre} ${option.perfil.apellido}` : option
			}
			onChange={handleAutocompleteClick}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Buscar paciente"
					value={filterQuery}
					onChangeCapture={handleFilterChange}
					name="paciente"
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
