import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Fragment } from 'react';
import { CallIcon, WhatsappIcon } from '@/assets/svgs';
import { useAgendaContext } from '../../context/agenda.context';
import { useShifts } from '../../hooks/use-shifts';
import { EmptyShiftOptions } from './empty-shift-options';
import { ShiftOptions } from './shift-options';
import { SkeletonRows } from './skeleton-rows';

dayjs.extend(utc);
dayjs.extend(timezone);

export const Shifts = () => {
	const { filters, drawerToOpen, openDrawer, closeDrawer, updateShiftInView } = useAgendaContext();
	const fakeClinicId = 1;

	const { data: shifts, isLoading } = useShifts(fakeClinicId, filters);

	const handleClickEmptyShift = (shift) => {
		return () => {
			updateShiftInView(shift);
			openDrawer('emptyShiftOptions');
		};
	};

	return (
		<TableContainer component={Paper} sx={{ mt: 4 }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: '5%', position: 'relative' }} align="center">
							<span>Turno</span>
							<Divider orientation="vertical" absolute sx={{ height: '50%', top: '25%' }} />
						</TableCell>
						<TableCell sx={{ width: '20%' }}>Paciente</TableCell>
						<TableCell sx={{ width: '20%' }}>Presentismo</TableCell>
						<TableCell sx={{ width: '15%' }}>Obra Social</TableCell>
						<TableCell sx={{ width: '20%' }}>Observación</TableCell>
						<TableCell sx={{ minWidth: '115px', width: '20%' }}>Contacto</TableCell>
						<TableCell sx={{ width: '0' }}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{isLoading ? (
						<SkeletonRows />
					) : (
						<>
							{shifts?.map((shift) => (
								<Fragment key={shift.id}>
									{shift.pacienteId ? (
										<TableRow
											sx={{
												textTransform: 'capitalize',
												'&:last-child td, &:last-child th': { border: 0 },
											}}
										>
											<TimeCell date={shift.date} />

											<TableCell>
												{shift.paciente.perfil.nombre} {shift.paciente.perfil.apellido}
											</TableCell>
											<TableCell sx={{ textTransform: 'capitalize' }}>
												{shift.presentismo}
											</TableCell>
											<TableCell sx={{ textTransform: 'capitalize' }}>{shift.obraSocial}</TableCell>
											<TableCell>{shift.observacion}</TableCell>
											<TableCell>
												<IconButton href={`tel:${shift.paciente.perfil.celular}`}>
													<CallIcon />
												</IconButton>
												<IconButton>
													<WhatsappIcon />
												</IconButton>
											</TableCell>
											<TableCell align="right">
												<IconButton onClick={() => openDrawer('shiftOptions')}>
													<MoreVertIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									) : (
										<TableRow
											sx={{
												cursor: 'pointer',
												pointerEvents: shift.habilitado ? 'auto' : 'none',
												'&:hover': { background: '#CCC2' },
											}}
											onClick={handleClickEmptyShift(shift)}
										>
											<TimeCell date={shift.date} />
											<TableCell sx={{ fontStyle: 'italic' }}>
												{!shift.habilitado ? 'Deshabilitado' : ''}
											</TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell align="right">
												<IconButton disabled>
													<MoreVertIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									)}
								</Fragment>
							))}
						</>
					)}
				</TableBody>
			</Table>
			<ShiftOptions open={drawerToOpen === 'shiftOptions'} onClose={closeDrawer} />
			<EmptyShiftOptions open={drawerToOpen === 'emptyShiftOptions'} onClose={closeDrawer} />
		</TableContainer>
	);
};

function TimeCell({ date }) {
	return (
		<TableCell sx={{ position: 'relative' }} align="center">
			<span>{dayjs.tz(date, 'America/Argentina/Buenos_Aires').format('HH:mm')}</span>
			<Divider orientation="vertical" absolute sx={{ height: '50%', top: '25%' }} />
		</TableCell>
	);
}
