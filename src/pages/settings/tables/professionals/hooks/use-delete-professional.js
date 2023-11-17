import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {object} data
 * @param {number} data.clinicaId
 * @param {number} data.profesionalId
 */
async function deleteProfessional({ clinicaId, profesionalId }) {
	const response = await api.delete(`/profesionales/${clinicaId}/${profesionalId}`);
	return response.data;
}

export const useDeleteProfessional = () => {
	const { id } = useStore((state) => state.clinic);
	const queryClient = useQueryClient();

	/**
	 * @param {number} profesionalId
	 */
	const mutationFn = (profesionalId) => {
		return deleteProfessional({ profesionalId, clinicaId: id });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
