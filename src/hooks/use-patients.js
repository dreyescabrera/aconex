import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getPatients = async (clinicId, patientId, additionalHeaders) => {
	let endpoint = `/pacientes/${clinicId}`;
	if (patientId) endpoint += `/${patientId}`;

	const response = await api.get(endpoint, additionalHeaders);
	return response.data;
};

/**
 * @param {number} [patientId]
 */
export const usePatients = (patientId) => {
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		headers: { Authorization: `Bearer ${user.token}` },
	};
	return useQuery({
		queryKey: ['patients', id, patientId],
		queryFn: () => getPatients(id, patientId, additionalHeaders),
	});
};
