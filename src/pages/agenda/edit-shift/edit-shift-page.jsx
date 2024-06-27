import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Form, TextInput } from '@/components/form';
import { usePatients } from '@/hooks/use-patients';
import { useEditShifts } from '../hooks/use-edit-shifts';

const opcionesPresentismo = [
	{ estado: 'Presente', color: '#63db8b' },
	{ estado: 'Atendido', color: '#6ad3ee' },
	{ estado: 'Ausente con aviso', color: '#d9e25d' },
	{ estado: 'Ausente sin aviso', color: '#ee1919' },
	{ estado: 'Confirmado', color: '#0f8519' },
	{ estado: 'Cancelado', color: '#000000' },
];
export const Component = () => {
	const { data: patients } = usePatients();
	const { mutate, isSuccess, error } = useEditShifts();
	const {
		state: { shift },
	} = useLocation();
	const navigate = useNavigate();
	const [cellphone, setCellphone] = useState(0);
	let flagobject = useRef(null); //flagobject
	let selectedoptions = useRef(opcionesPresentismo[1]);

	const handleCellphonechange = (data) => {
		setCellphone(data.target.value);
	};
	const handleOnChange = (selected) => {
		selectedoptions.current = selected;
	};
	const Isthesameobject = (data) => {
		//due to an autocomplete malfunction where the input overwrites
		// default data on every Render on the input hook
		//ive created this piece of code that veryfies if the object
		//changed so the input can be modifiable
		if (flagobject.current === null) {
			return false;
		}

		if (typeof data != typeof flagobject.current) {
			return false;
		}

		if (typeof data === 'string') {
			if (data != flagobject.current) {
				return false;
			}
			return true;
		}

		if (data.inputValue && flagobject.current.inputValue) {
			if (data.inputValue != flagobject.current.inputValue) {
				return false;
			}
			return true;
		}

		if (data.id && flagobject.current.id) {
			if (data.id != flagobject.current.id) {
				return false;
			}
			return true;
		}

		if (data.title && flagobject.current.title) {
			if (data.title != flagobject.current.title) {
				return false;
			}
			return true;
		}

		return false;
	};

	const handleMutate = (newFields) => {
		let data = {
			shiftId: shift.id,
			pacienteId: newFields.paciente.id,
			profesionalId: shift.profesionalId,
		};

		for (var key in newFields) {
			if (key === 'obraSocial' || key === 'observacion' || key === 'presentismo') {
				if (newFields[key] != null && newFields[key] != '' && newFields[key] != ' ') {
					data = { [key]: newFields[key], ...data };
				}
			}
		}
		if (typeof data.presentismo === 'object') {
			data.presentismo = data.presentismo.estado;
		}
		if (cellphone == undefined || cellphone == null || cellphone < 0) {
			data.celular = null;
		} else {
			if (cellphone.toString() != '' && cellphone != 0) {
				let cell = cellphone;
				if (typeof cellphone === 'string') {
					cell = Number(cellphone);
				}
				data = { celular: cell, ...data };
			} else {
				data.celular = null;
			}
		}

		mutate(data, { onSuccess: () => setTimeout(() => navigate(-1), 1_500) });
	};

	return (
		<>
			<Helmet>
				<title>Editar turno</title>
			</Helmet>
			<Container>
				<Typography variant="h3" component="h1" sx={{ mb: 3 }}>
					Editar turno
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
				<Form
					defaultValues={{
						paciente: shift.paciente,
						observacion: shift.observacion,
						presentismo: shift.presentismo,
						obraSocial: shift.obraSocial,
						celular: shift.paciente.perfil.celular,
					}}
					onSubmit={handleMutate}
				>
					<Stack spacing={4}>
						<Autocomplete
							name="paciente"
							inputProps={{ variant: 'standard', label: 'Paciente' }}
							options={patients ?? []}
							getOptionLabel={(opt) => {
								let boolflag = Isthesameobject(opt);
								if (typeof opt === 'string') {
									if (!boolflag) {
										flagobject.current = opt;
										setCellphone(0);
									}
									return opt;
								}
								if (opt.inputValue) {
									if (!boolflag) {
										flagobject.current = opt;
										setCellphone(0);
									}
									return opt.inputValue;
								}
								if (opt.perfil?.nombre != undefined) {
									if (opt.perfil?.celular != undefined && opt.perfil?.celular != null) {
										if (!boolflag) {
											flagobject.current = opt;
											setCellphone(opt.perfil.celular);
										}
									} else {
										if (!boolflag) {
											flagobject.current = opt;
											setCellphone(0);
										}
									}
									return `${opt.perfil.nombre} ${opt.perfil.apellido} — ${opt.perfil.email}`;
								}
								if (!boolflag) {
									flagobject.current = opt;
									setCellphone(0);
								}
								return opt.title;
							}}
							isOptionEqualToValue={(option, value) => option.id === value.id}
						/>
						<TextInput
							name="observacion"
							variant="standard"
							label="Observación"
							rules={{ required: false }}
						/>
						<Autocomplete
							name="presentismo"
							onChange={handleOnChange}
							options={opcionesPresentismo}
							getOptionLabel={(opt) =>
								opt.estado === undefined ? shift.presentismo : `${opt.estado}`
							}
							isOptionEqualToValue={(option, value) => option.estado === value.estado}
							renderOption={(props, option) => (
								<li {...props}>
									{<FiberManualRecordIcon sx={{ color: option.color }} />}
									{option.estado}
								</li>
							)}
							inputProps={{
								variant: 'standard',
								label: 'Presentismo',
							}}
						/>
						<TextInput
							name="celular"
							value={cellphone}
							onChange={handleCellphonechange}
							variant="standard"
							label="tel/celular"
							type="number"
							rules={{ required: false }}
						/>
						<TextInput
							name="obraSocial"
							variant="standard"
							label="Obra Social"
							rules={{ required: false }}
						/>
						<Button type="submit" variant="contained">
							Modificar turno
						</Button>
					</Stack>
				</Form>
				<Collapse in={isSuccess}>
					<Alert severity="success" sx={{ mt: 2 }}>
						Turno editado con éxito!
					</Alert>
				</Collapse>
				<Collapse in={Boolean(error)}>
					<Alert severity="error" sx={{ mt: 2 }}>
						{/* @ts-ignore */}
						Hubo un problema creando el sobreturno: {error?.response.data.message}
					</Alert>
				</Collapse>
			</Container>
		</>
	);
};
