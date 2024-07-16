import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useProfessionals } from '@/hooks/use-professionals';
import { useSpecialties } from '@/hooks/use-specialties';
import { useAgendaContext } from '../../context/agenda.context';

const handleCedula = (cedula) => {
	if (!cedula) {
		return ' ';
	} else {
		return cedula;
	}
};

export const FilterByProfessional = () => {
	const { updateFilters, filters } = useAgendaContext();
	const { data: professionals } = useProfessionals();
	const { data: specialties } = useSpecialties();

	const handleChangeProfessional = (ev, professional, reason) => {
		if (reason === 'clear') {
			updateFilters({ profesionalId: undefined });
			return;
		}

		updateFilters({ profesionalId: professional.id });
	};

	const handleChangeSpecialty = (ev, specialty, reason) => {
		if (reason === 'clear') {
			updateFilters({ especialidadId: undefined });
			return;
		}

		updateFilters({ especialidadId: specialty.id });
	};

	const initialProfessional = filters.get('profesionalId')
		? professionals?.find((prof) => prof.id === Number(filters.get('profesionalId')))
		: null;
	const initialSpecialty = filters.get('especialidadId')
		? specialties?.find((specialty) => specialty.id === Number(filters.get('especialidadId')))
		: null;

	return (
		<Paper sx={{ p: 2 }} variant="outlined">
			<Typography variant="h6" component="h3" sx={{ mb: 2 }}>
				Selección de profesional
			</Typography>

			<p>Selecciona el profesional y la especialidad que quieres ver</p>

			<Grid container spacing={2}>
				<Grid xs>
					<Autocomplete
						defaultValue={initialProfessional}
						clearOnBlur={false}
						onChange={handleChangeProfessional}
						options={professionals ?? []}
						getOptionLabel={(opt) =>
							`${opt.perfil.nombre} ${opt.perfil.apellido} ${handleCedula(opt.perfil.cedula)}`
						}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						renderInput={(params) => <TextField {...params} label="Profesional" size="small" />}
					/>
				</Grid>
				<Grid xs={5}>
					<Autocomplete
						onChange={handleChangeSpecialty}
						defaultValue={initialSpecialty}
						options={specialties ?? []}
						getOptionLabel={(opt) => opt.nombre}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						renderInput={(params) => <TextField {...params} label="Especialidad" size="small" />}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};
