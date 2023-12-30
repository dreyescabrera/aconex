import Alert from '@mui/material/Alert';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Form, TextInput } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { NewPatientDialog } from '../components/dialogs';
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
	const [isopen, setIsopen] = useState(false);
	const [namevalue, setNamevalue] = useState('');
	const [value, setValue] = useState('');

	const handleOnChange = (event, newValue) => {
		if (typeof newValue === 'string') {
			// timeout to avoid instant validation of the dialog's form.
			setTimeout(() => {
				setIsopen(true);
				setNamevalue(newValue);
			});
		} else if (newValue && newValue.inputValue) {
			setIsopen(true);
			setNamevalue(newValue.inputValue);
		} else {
			setValue(newValue);
		}
	};

	const handleClosedialog = () => {
		setIsopen(false);
	};
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
		datos = {
			shiftId: shift.id,
			profesionalId: shift.profesionalId,
			pacienteId: formdata.patient.id,
			...datos,
		};
		mutate(datos, { onSuccess: () => setTimeout(() => navigate(-1), 4_000) });
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
							value={value}
							loading={isLoading}
							loadingText="Cargando lista de pacientes..."
							onChange={handleOnChange}
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
				<Collapse in={mutationIsSuccess}>
					<Alert severity="success" sx={{ mt: 2 }}>
						Turno asignado con éxito!
					</Alert>
				</Collapse>
				<NewPatientDialog open={isopen} onClose={handleClosedialog} name={namevalue} />
			</Container>
		</>
	);
};
