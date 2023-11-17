import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} profesionalId
 * @param {number} ausenciaId
 */
async function deleteAbsence(profesionalId, ausenciaId) {
	const res = await api.delete(`ausencias/${profesionalId}/${ausenciaId}`);
	return res.data;
}

export const useDeleteAbsence = () => {
	const queryClient = useQueryClient();

	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {number} data.ausenciaId
	 */
	const mutationFn = ({ profesionalId, ausenciaId }) => {
		return deleteAbsence(profesionalId, ausenciaId);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['professionals'] });
		},
	});
};
