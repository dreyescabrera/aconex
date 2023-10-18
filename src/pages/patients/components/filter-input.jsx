import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

export const FilterInput = () => {
	return (
		<Autocomplete
			freeSolo
			options={[]}
			getOptionLabel={(option) =>
				typeof option !== 'string' ? `${option.nombre} ${option.apellido}` : option
			}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Buscar paciente"
					value=""
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
