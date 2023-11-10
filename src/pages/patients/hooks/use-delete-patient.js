import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

const deletePatient = async (clinicaId, patientId) => {
	const response = await api.delete(`pacientes/${clinicaId}/${patientId}`);
	return response.data;
};

export const useDeletePatient = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);

	/**
	 * @param {number} patientId
	 */
	const mutationFn = (patientId) => {
		return deletePatient(id, patientId);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
	});
};
