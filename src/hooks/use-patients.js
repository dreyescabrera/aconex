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
	const fakeClinicId = 1;

	return useQuery({
		queryKey: ['patients', fakeClinicId, patientId],
		queryFn: () => getPatients(fakeClinicId, patientId),
	});
};
