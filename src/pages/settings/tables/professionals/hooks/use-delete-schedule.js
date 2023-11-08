import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} profesionalId
 * @param {number} horarioId
 */
const deleteSchedule = async (profesionalId, horarioId) => {
	const response = await api.delete(`/horarios/${profesionalId}/${horarioId}`);

	return response.data;
};

export const useDeleteSchedule = () => {
	const queryClient = useQueryClient();

	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {number} data.horarioId
	 */
	const mutationFn = ({ profesionalId, horarioId }) => {
		return deleteSchedule(profesionalId, horarioId);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
