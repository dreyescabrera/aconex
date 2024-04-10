import { groupBy } from '@/utils/groupBy';
import { useProfessionals } from '@/hooks/use-professionals';
import { useAgendaContext } from '../../context/agenda.context';
import { useShifts } from '../../hooks/use-shifts';
import { EnableShift } from '../dialogs/enable-shift';
import { EmptyShiftOptions } from './empty-shift-options';
import { MultiProfessionalShiftsTable } from './multi-professional-shifts-table';
import { ShiftOptions } from './shift-options';
import { SingleProfessionalShiftsTable } from './single-professional-shifts-table';

export const Shifts = () => {
	const { filters, drawerToOpen, closeDrawer, handleShiftOptions } = useAgendaContext();
	const { shiftInView } = useAgendaContext();

	const { data: shifts } = useShifts(Object.fromEntries(filters.entries()));
	const { data: professionals } = useProfessionals();

	let shiftsGroupedByProfessionals;

	if (Boolean(shifts) && Boolean(professionals) && !filters.get('profesionalId')) {
		shiftsGroupedByProfessionals = groupBy(shifts, 'profesionalId');

		for (const id in shiftsGroupedByProfessionals) {
			const professional = professionals?.find((prof) => prof.id === Number(id));
			shiftsGroupedByProfessionals[
				`${professional?.perfil.nombre} ${professional?.perfil.apellido}`
			] = shiftsGroupedByProfessionals[id];

			delete shiftsGroupedByProfessionals[id];
		}
	}

	return (
		<>
			{shiftsGroupedByProfessionals ? (
				<MultiProfessionalShiftsTable
					shiftsToRender={shiftsGroupedByProfessionals}
					handleShiftOptions={handleShiftOptions}
				/>
			) : (
				<SingleProfessionalShiftsTable
					shiftsToRender={shifts}
					handleShiftOptions={handleShiftOptions}
				/>
			)}
			<ShiftOptions open={drawerToOpen === 'shiftOptions'} onClose={closeDrawer} />
			<EmptyShiftOptions open={drawerToOpen === 'emptyShiftOptions'} onClose={closeDrawer} />
			<EnableShift
				open={drawerToOpen === 'disabledshift'}
				onClose={closeDrawer}
				shift={shiftInView}
			/>
		</>
	);
};
