import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicId
 * @param {number} holidayId
 * @param {object} additionalHeaders
 */
async function deleteDate(clinicId, holidayId, additionalHeaders) {
	const res = await api.delete(`/feriados/${clinicId}/${holidayId}`, additionalHeaders);
	return res.data;
}

export const useDeleteHoliday = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {number} holidayId
	 */
	const mutationFn = (holidayId) => {
		return deleteDate(id, holidayId, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['holidays'] }),
	});
};
