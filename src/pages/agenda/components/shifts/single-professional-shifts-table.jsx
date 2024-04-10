import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Fragment } from 'react';
import { ColoriconPresentism } from '@/components/Coloricon/Coloriconpresentism';
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
									{shift.pacienteId && (
										<BodyRow>
											<TimeCell date={shift.date} />

											<TableCell>
												{shift.paciente.perfil.nombre} {shift.paciente.perfil.apellido}
											</TableCell>
											<TableCell>
												<div
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
													}}
												>
													{<ColoriconPresentism presentism={shift.presentismo} />}
													{shift.presentismo}
												</div>
											</TableCell>
											<TableCell>{shift.obraSocial}</TableCell>
											<TableCell>{shift.observacion}</TableCell>
											<ContactCell
												phoneNumber={shift.paciente.perfil.celular}
												name={shift.paciente.perfil.nombre}
												date={shift.date}
											/>
											<OptionsCell onClick={handleShiftOptions(shift, 'shiftOptions')} />
										</BodyRow>
									)}

									{!shift.pacienteId && !shift.habilitado && (
										<TableRow
											sx={{
												background: '#FCC2',
											}}
										>
											<TimeCell date={shift.date} />
											<TableCell sx={{ fontStyle: 'italic' }} colSpan={5}>
												Deshabilitado
											</TableCell>
											<OptionsCell onClick={handleShiftOptions(shift, 'disabledshift')} />
										</TableRow>
									)}

									{!shift.pacienteId && shift.habilitado && (
										<TableRow
											sx={{
												cursor: 'pointer',
												'&:hover': { background: '#CCC2' },
											}}
											onClick={handleShiftOptions(shift, 'emptyShiftOptions')}
										>
											<TimeCell date={shift.date} />
											<TableCell colSpan={5}></TableCell>
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
