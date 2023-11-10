import { useStore } from '@/store/use-store';
import { groupBy } from '@/utils/groupBy';
import Alert from '@mui/material/Alert';
import { useProfessionals } from '@/hooks/use-professionals';
import { useAgendaContext } from '../../context/agenda.context';
import { useShifts } from '../../hooks/use-shifts';
import { EmptyShiftOptions } from './empty-shift-options';
import { MultiProfessionalShiftsTable } from './multi-professional-shifts-table';
import { ShiftOptions } from './shift-options';
import { SingleProfessionalShiftsTable } from './single-professional-shifts-table';

export const Shifts = () => {
	const { filters, drawerToOpen, closeDrawer, handleShiftOptions } = useAgendaContext();
	const clinic = useStore((state) => state.clinic);

	const { data: shifts } = useShifts(clinic.id, Object.fromEntries(filters.entries()));
	const { data: professionals } = useProfessionals();

	let shiftsGroupedByProfessionals;

	if (Boolean(shifts) && Boolean(professionals) && !filters.get('profesionalId')) {
		shiftsGroupedByProfessionals = groupBy(shifts, 'profesionalId');

		for (const id in shiftsGroupedByProfessionals) {
			const professional = professionals.find((prof) => prof.id === Number(id));
			shiftsGroupedByProfessionals[
				`${professional.perfil.nombre} ${professional.perfil.apellido}`
			] = shiftsGroupedByProfessionals[id];

			delete shiftsGroupedByProfessionals[id];
		}
	}

	if (shifts?.length === 0) {
		return <Alert severity="warning">No se Encontro ningun turno</Alert>;
	}

	return (
		<>
			{shiftsGroupedByProfessionals ? (
				shiftsGroupedByProfessionals > 0 ? (
					<MultiProfessionalShiftsTable
						shiftsToRender={shiftsGroupedByProfessionals}
						handleShiftOptions={handleShiftOptions}
					/>
				) : (
					<Alert severity="warning">No se Encontro ningun turno</Alert>
				)
			) : (
				<SingleProfessionalShiftsTable
					shiftsToRender={shifts}
					handleShiftOptions={handleShiftOptions}
				/>
			)}
			<ShiftOptions open={drawerToOpen === 'shiftOptions'} onClose={closeDrawer} />
			<EmptyShiftOptions open={drawerToOpen === 'emptyShiftOptions'} onClose={closeDrawer} />
		</>
	);
};
