import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getProfessionals = async (clinicId, professionalId, additionalHeaders) => {
	let endpoint = `/profesionales/${clinicId}`;
	if (professionalId) endpoint += `/${professionalId}`;

	const response = await api.get(endpoint, additionalHeaders);
	return response.data;
};

/**
 * @param {number} [professionalId]
 */
export const useProfessionals = (professionalId) => {
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		headers: { Authorization: `Bearer ${user.token}` },
	};
	return useQuery({
		queryKey: ['professionals', id, professionalId],
		queryFn: () => getProfessionals(id, professionalId, additionalHeaders),
	});
};
