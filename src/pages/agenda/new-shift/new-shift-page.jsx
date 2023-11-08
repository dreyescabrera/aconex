import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Form, TextInput } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { useEditShifts } from '../hooks/use-edit-shifts';

export const NewShiftPage = () => {
	const { data: patients, isLoading } = usePatients();
	const {
		state: { shift },
	} = useLocation();
	const { mutate, isLoading: mutationIsLoading, isSuccess: mutationIsSuccess } = useEditShifts();
	const navigate = useNavigate();

	const assignPatientToShift = (formdata) => {
		mutate(
			{
				shiftId: shift.id,
				profesionalId: shift.profesionalId,
				pacienteId: formdata.patient.id,
				observacion: formdata.notes,
				presentismo: formdata.attendance,
				obraSocial: formdata.socialWork,
			},
			{ onSuccess: () => setTimeout(() => navigate('..', { relative: 'path' }), 4_000) }
		);
	};

	return (
		<>
			<Helmet>
				<title>Nuevo turno</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1">
					Nuevo turno
				</Typography>
				<Typography
					variant="h5"
					textTransform="capitalize"
					fontWeight="bold"
					component="p"
					sx={{ mb: 3, mt: 1 }}
				>
					{dayjs(shift.date).format('MMMM DD | HH:mm')}
				</Typography>
				<Typography variant="h6" component="h2" sx={{ mb: 3 }}>
					Datos requeridos
				</Typography>
				<Form
					defaultValues={{ notes: '', presentismo: '', patient: null }}
					onSubmit={assignPatientToShift}
				>
					<Stack spacing={4}>
						<Autocomplete
							name="patient"
							options={patients ?? []}
							loading={isLoading}
							loadingText="Cargando lista de pacientes..."
							getOptionLabel={(opt) =>
								`${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`
							}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							inputProps={{
								variant: 'standard',
								label: 'Paciente',
								placeholder: 'Nombre del Paciente e email',
							}}
						/>

						<TextInput name="notes" variant="standard" label="Observación" />
						<TextInput name="attendance" variant="standard" label="Presentismo" />
						<TextInput
							name="socialWork"
							variant="standard"
							label="Obra Social"
							rules={{ required: false }}
						/>
						<Button type="submit" variant="contained" disabled={mutationIsLoading}>
							Asignar turno
							{mutationIsLoading && (
								<CircularProgress
									size={24}
									sx={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										marginTop: '-12px',
										marginLeft: '-12px',
									}}
								/>
							)}
						</Button>
					</Stack>
				</Form>
				<Slide direction="up" in={mutationIsSuccess} mountOnEnter unmountOnExit>
					<Alert severity="success" sx={{ mt: 2 }}>
						Turno asignado con éxito!
					</Alert>
				</Slide>
			</Container>
		</>
	);
};
