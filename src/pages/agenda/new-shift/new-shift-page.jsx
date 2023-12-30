import { useCreatePatient } from '@/pages/patients/hooks/use-create-patient';
import Alert from '@mui/material/Alert';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Form, TextInput } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { useEditShifts } from '../hooks/use-edit-shifts';

const filter = createFilterOptions();
const opciones = (opt) => {
	if (typeof opt === 'string') {
		return opt;
	}
	if (opt.inputValue) {
		return opt.inputValue;
	}
	if (opt.perfil?.nombre != undefined) {
		return `${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`;
	}
};

export const Component = () => {
	const { mutate: createpatient, status: patientstatus } = useCreatePatient();
	const { data: patients, isLoading } = usePatients();
	const {
		state: { shift },
	} = useLocation();
	const { mutate, isLoading: mutationIsLoading, isSuccess: mutationIsSuccess } = useEditShifts();
	const navigate = useNavigate();

	const assignPatientToShift = (formdata) => {
		let datos = {};
		for (var key in formdata) {
			if (formdata[key] != '' && key != 'patient') {
				datos = { [key]: formdata[key], ...datos };
			}
		}

		if (formdata.patient.inputValue) {
			let pacienteobj = { nombre: formdata.patient.inputValue, apellido: ' ' };
			createpatient(pacienteobj, {
				onSuccess: async (patientdata) => {
					datos = {
						shiftId: shift.id,
						profesionalId: shift.profesionalId,
						pacienteId: patientdata.data.id,
						...datos,
					};
					mutate(datos, { onSuccess: () => setTimeout(() => navigate(-1), 4_000) });
				},
			});
		} else {
			datos = {
				shiftId: shift.id,
				profesionalId: shift.profesionalId,
				pacienteId: formdata.patient.id,
				...datos,
			};
			mutate(datos, { onSuccess: () => setTimeout(() => navigate(-1), 4_000) });
		}
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
					defaultValues={{ observacion: '', presentismo: '', patient: null }}
					onSubmit={assignPatientToShift}
				>
					<Stack spacing={4}>
						<Autocomplete
							name="patient"
							options={patients ?? []}
							loading={isLoading}
							loadingText="Cargando lista de pacientes..."
							filterOptions={(options, params) => {
								const filtered = filter(options, params);
								if (params.inputValue != '') {
									filtered.push({
										inputValue: params.inputValue,
										title: `Agregar "${params.inputValue}"`,
									});
								}

								return filtered;
							}}
							getOptionLabel={(opt) => {
								if (typeof opt === 'string') {
									return opt;
								}
								if (opt.inputValue) {
									return opt.inputValue;
								}
								if (opt.perfil?.nombre != undefined) {
									return `${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`;
								}
								return opt.title;
							}}
							inputProps={{
								variant: 'standard',
								label: 'Paciente',
								placeholder: 'Nombre del Paciente e email',
							}}
							selectOnFocus
							clearOnBlur
							handleHomeEndKeys
							renderOption={(props, option) => (
								<li {...props}>
									{typeof option.title === 'string' ? option.title : opciones(option)}
								</li>
							)}
							freeSolo
						/>

						<TextInput
							name="observacion"
							variant="standard"
							label="Observación"
							rules={{ required: false }}
						/>
						<TextInput
							name="presentismo"
							variant="standard"
							label="Presentismo"
							rules={{ required: false }}
						/>
						<TextInput
							name="obraSocial"
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
				{patientstatus === 'loading' && <Alert severity="info">Cargando...</Alert>}

				{patientstatus === 'error' && (
					// @ts-ignore
					<Alert severity="error">Error al crear el paciente</Alert>
				)}

				{patientstatus === 'success' && (
					<Alert severity="success">Paciente creado con éxito.</Alert>
				)}
				<Collapse in={mutationIsSuccess}>
					<Alert severity="success" sx={{ mt: 2 }}>
						Turno asignado con éxito!
					</Alert>
				</Collapse>
			</Container>
		</>
	);
};
