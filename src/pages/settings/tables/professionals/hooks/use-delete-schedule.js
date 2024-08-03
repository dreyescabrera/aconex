import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} profesionalId
 * @param {number} horarioId
 * @param {object} additionalHeaders
 */
const deleteSchedule = async (profesionalId, horarioId, additionalHeaders) => {
	const response = await api.delete(`/horarios/${profesionalId}/${horarioId}`, additionalHeaders);

	return response.data;
};

export const useDeleteSchedule = () => {
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {number} data.horarioId
	 */
	const mutationFn = ({ profesionalId, horarioId }) => {
		return deleteSchedule(profesionalId, horarioId, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
