import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Form } from '@/components/form';
import { useProfessionals } from '@/hooks/use-professionals';
import { useSpecialties } from '@/hooks/use-specialties';
import { useAgendaContext } from '../../context/agenda.context';

export const FilterByProfessional = () => {
	const { updateFilters } = useAgendaContext();
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

	return (
		<Paper sx={{ p: 2 }} variant="outlined">
			<Typography variant="h6" component="h3" sx={{ mb: 2 }}>
				Selección de profesional
			</Typography>

			<p>Selecciona el profesional y la especialidad que quieres ver</p>

			<Form defaultValues={{ profesional: null }} onSubmit={console.info}>
				<Grid container spacing={2}>
					<Grid xs>
						<Autocomplete
							defaultValue={null}
							clearOnBlur={false}
							onChange={handleChangeProfessional}
							options={professionals ?? []}
							getOptionLabel={(opt) =>
								`${opt.perfil.nombre} ${opt.perfil.apellido} ${opt.perfil.cedula}`
							}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							renderInput={(params) => <TextField {...params} label="Profesional" size="small" />}
						/>
					</Grid>
					<Grid xs={5}>
						<Autocomplete
							onChange={handleChangeSpecialty}
							defaultValue={null}
							options={specialties ?? []}
							getOptionLabel={(opt) => opt.nombre}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							renderInput={(params) => <TextField {...params} label="Especialidad" size="small" />}
						/>
					</Grid>
				</Grid>
			</Form>
		</Paper>
	);
};
