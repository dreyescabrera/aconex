import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicId
 * @param {number} holidayId
 */
async function deleteDate(clinicId, holidayId) {
	const res = await api.delete(`/feriados/${clinicId}/${holidayId}`);
	return res.data;
}

export const useDeleteHoliday = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);

	/**
	 * @param {number} holidayId
	 */
	const mutationFn = (holidayId) => {
		return deleteDate(id, holidayId);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['holidays'] }),
	});
};
