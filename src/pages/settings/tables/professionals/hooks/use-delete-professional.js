import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {object} data
 * @param {number} data.clinicaId
 * @param {number} data.profesionalId
 * @param {object} additionalHeaders
 */
async function deleteProfessional({ clinicaId, profesionalId }, additionalHeaders) {
	const response = await api.delete(
		`/profesionales/${clinicaId}/${profesionalId}`,
		additionalHeaders
	);
	return response.data;
}

export const useDeleteProfessional = () => {
	const { id } = useStore((state) => state.clinic);
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {number} profesionalId
	 */
	const mutationFn = (profesionalId) => {
		return deleteProfessional(
			{ profesionalId, clinicaId: id },
			{ headers: { ...additionalHeaders } }
		);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
