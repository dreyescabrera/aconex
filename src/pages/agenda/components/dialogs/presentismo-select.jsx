import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useRef } from 'react';
import { Autocomplete, Form } from '@/components/form';
import { useEditShifts } from '../../hooks/use-edit-shifts';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {any} props.id
 * @param {any} props.profesionalId
 * @param {any} props.presentismo //presentismo que viene de agenda context
 * @param {any} props.presentstate //presentismo que viene del usestate
 * @param {any} props.presentedit //edicion del presentismo usestate
 */
export const Presentismoselect = ({
	open,
	onClose,
	id,
	profesionalId,
	presentismo,
	presentstate,
	presentedit,
}) => {
	const editarturnomutation = useEditShifts();

	const opciones = [
		{ estado: 'Presente', color: '#63db8b' },
		{ estado: 'Atendido', color: '#6ad3ee' },
		{ estado: 'Ausento con aviso', color: '#d9e25d' },
		{ estado: 'Ausento sin aviso', color: '#ee1919' },
		{ estado: 'Confirmado', color: '#0f8519' },
		{ estado: 'Cancelado', color: '#000000' },
	];

	let selectedoptions = useRef(opciones[1]);
	let closedflag = useRef(false);

	const handleOnChange = (selected) => {
		selectedoptions.current = selected;
	};

	const handleendtime = (response) => {
		presentedit(response.data.presentismo);
		closedflag.current = false;
		onClose();
	};

	const handleSubmit = (dato) => {
		editarturnomutation.mutate(
			{
				shiftId: id,
				profesionalId: profesionalId,
				presentismo: dato.presentism.estado,
			},
			{
				onSuccess: (data) => {
					closedflag.current = true;
					setTimeout(() => handleendtime(data), 1000);
				},
			}
		);
	};

	const Coloricon = () => {
		if (presentstate === '') {
			if (presentismo === null || presentismo === '' || presentismo === ' ') {
				return <FiberManualRecordIcon sx={{ color: 'transparent' }} />;
			} else {
				switch (presentismo) {
					case 'Presente':
						return <FiberManualRecordIcon sx={{ color: '#63db8b' }} />;
					case 'Atendido':
						return <FiberManualRecordIcon sx={{ color: '#6ad3ee' }} />;
					case 'Ausento con aviso':
						return <FiberManualRecordIcon sx={{ color: '#d9e25d' }} />;
					case 'Ausento sin aviso':
						return <FiberManualRecordIcon sx={{ color: '#ee1919' }} />;
					case 'Confirmado':
						return <FiberManualRecordIcon sx={{ color: '#0f8519' }} />;
					case 'Cancelado':
						return <FiberManualRecordIcon sx={{ color: '#000000' }} />;
					default:
						return <FiberManualRecordIcon sx={{ color: 'transparent' }} />;
				}
			}
		} else {
			switch (presentstate) {
				case 'Presente':
					return <FiberManualRecordIcon sx={{ color: '#63db8b' }} />;
				case 'Atendido':
					return <FiberManualRecordIcon sx={{ color: '#6ad3ee' }} />;
				case 'Ausento con aviso':
					return <FiberManualRecordIcon sx={{ color: '#d9e25d' }} />;
				case 'Ausento sin aviso':
					return <FiberManualRecordIcon sx={{ color: '#ee1919' }} />;
				case 'Confirmado':
					return <FiberManualRecordIcon sx={{ color: '#0f8519' }} />;
				case 'Cancelado':
					return <FiberManualRecordIcon sx={{ color: '#000000' }} />;
				default:
					return <FiberManualRecordIcon sx={{ color: 'transparent' }} />;
			}
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Presentismo</DialogTitle>
			<DialogContent dividers>
				<List disablePadding>
					<ListItem disableGutters disablePadding>
						{presentstate === '' ? (
							<ListItemText
								primary={`Presentismo actual: ${presentismo}`}
								secondary={` Presione para cambiar presentismo`}
							/>
						) : (
							<ListItemText
								primary={`Presentismo actual: ${presentstate}`}
								secondary={` Seleccione una opción para cambiar presentismo`}
							/>
						)}
						<ListItemIcon>
							<Coloricon />
						</ListItemIcon>
					</ListItem>
				</List>
				{editarturnomutation.isLoading ? (
					<CircularProgress />
				) : editarturnomutation.isError ? (
					<Alert security="error">
						{/* @ts-ignore */}
						Error al Editar presentismo: {editarturnomutation?.error?.response?.data?.message}
					</Alert>
				) : editarturnomutation.isSuccess && closedflag.current ? (
					<Alert severity="success">Presentismo editado con exito!</Alert>
				) : (
					<Stack padding={5}>
						<Form onSubmit={handleSubmit} defaultValues={{ presentism: opciones[0] }}>
							<Stack display="flex" flexDirection="column" minWidth="fit-content" gap={5}>
								<Autocomplete
									name="presentism"
									onChange={handleOnChange}
									options={opciones}
									getOptionLabel={(opt) => `${opt.estado}`}
									isOptionEqualToValue={(option, value) => option.estado === value.estado}
									renderOption={(props, option) => (
										<li {...props}>
											{<FiberManualRecordIcon sx={{ color: option.color }} />}
											{option.estado}
										</li>
									)}
								/>
								<Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
									Aceptar
								</Button>
							</Stack>
						</Form>
					</Stack>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cerrar</Button>
			</DialogActions>
		</Dialog>
	);
};
