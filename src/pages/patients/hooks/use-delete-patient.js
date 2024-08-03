import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

const deletePatient = async (clinicaId, patientId, additionalHeaders) => {
	const response = await api.delete(`pacientes/${clinicaId}/${patientId}`, additionalHeaders);
	return response.data;
};

export const useDeletePatient = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {number} patientId
	 */
	const mutationFn = (patientId) => {
		return deletePatient(id, patientId, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
	});
};
