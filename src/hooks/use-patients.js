import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getPatients = async (clinicId, patientId) => {
	let endpoint = `/pacientes/${clinicId}`;
	if (patientId) endpoint += `/${patientId}`;

	const response = await api.get(endpoint);
	return response.data;
};

/**
 * @param {number} [patientId]
 */
export const usePatients = (patientId) => {
	const { clinicaId } = useStore((state) => state.clinic);

	return useQuery({
		queryKey: ['patients', clinicaId, patientId],
		queryFn: () => getPatients(clinicaId, patientId),
	});
};
