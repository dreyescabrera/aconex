import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Fragment } from 'react';
import { SkeletonRows } from './skeleton-rows';
import { BodyRow } from './table/body-row';
import { ContactCell } from './table/contact-cell';
import { HeadRow } from './table/head-row';
import { OptionsCell } from './table/options-cell';
import { TimeCell } from './table/time-cell';

/**
 * @param {object} props
 * @param {Array<any>} props.shiftsToRender
 * @param {(shift: any, drawerToOpen: import('../../context/agenda.context').DrawerToOpen) => () => void} props.handleShiftOptions
 */
export const SingleProfessionalShiftsTable = ({ shiftsToRender, handleShiftOptions }) => {
	return (
		<TableContainer component={Paper} sx={{ mt: 4 }}>
			<Table>
				<HeadRow />
				<TableBody>
					{typeof shiftsToRender === 'undefined' ? (
						<SkeletonRows />
					) : (
						<>
							{shiftsToRender?.map((shift) => (
								<Fragment key={shift.id}>
									{shift.pacienteId ? (
										<BodyRow>
											<TimeCell date={shift.date} />

											<TableCell>
												{shift.paciente.perfil.nombre} {shift.paciente.perfil.apellido}
											</TableCell>
											<TableCell>{shift.presentismo}</TableCell>
											<TableCell>{shift.obraSocial}</TableCell>
											<TableCell>{shift.observacion}</TableCell>
											<ContactCell phoneNumber={shift.paciente.perfil.celular} />
											<TableCell align="right">
												<IconButton onClick={handleShiftOptions(shift, 'shiftOptions')}>
													<MoreVertIcon />
												</IconButton>
											</TableCell>
										</BodyRow>
									) : (
										<TableRow
											sx={{
												cursor: 'pointer',
												pointerEvents: shift.habilitado ? 'auto' : 'none',
												'&:hover': { background: '#CCC2' },
											}}
											onClick={handleShiftOptions(shift, 'emptyShiftOptions')}
										>
											<TimeCell date={shift.date} />
											<TableCell sx={{ fontStyle: 'italic' }} colSpan={5}>
												{!shift.habilitado ? 'Deshabilitado' : ''}
											</TableCell>
											<OptionsCell disabled />
										</TableRow>
									)}
								</Fragment>
							))}
						</>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
