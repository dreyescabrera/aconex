import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} profesionalId
 * @param {number} ausenciaId
 * @param {object} additionalHeaders
 */
async function deleteAbsence(profesionalId, ausenciaId, additionalHeaders) {
	const res = await api.delete(`ausencias/${profesionalId}/${ausenciaId}`, additionalHeaders);
	return res.data;
}

export const useDeleteAbsence = () => {
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {number} data.ausenciaId
	 */
	const mutationFn = ({ profesionalId, ausenciaId }) => {
		return deleteAbsence(profesionalId, ausenciaId, additionalHeaders);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['professionals'] });
		},
	});
};
