import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getProfessionals = async (clinicId, professionalId) => {
	let endpoint = `/profesionales/${clinicId}`;
	if (professionalId) endpoint += `/${professionalId}`;

	const response = await api.get(endpoint);
	return response.data;
};

/**
 * @param {number} [professionalId]
 */
export const useProfessionals = (professionalId) => {
	const fakeClinicId = 1;

	return useQuery({
		queryKey: ['professionals', fakeClinicId, professionalId],
		queryFn: () => getProfessionals(fakeClinicId, professionalId),
	});
};
