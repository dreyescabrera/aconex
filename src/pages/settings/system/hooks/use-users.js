import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicaId
 * @param {object} additionalHeaders
 * @param {number} [userId]
 */
const fetchUsers = async (clinicaId, additionalHeaders, userId) => {
	let endpoint = `/usuarios/${clinicaId}`;
	if (userId) endpoint += `/${userId}`;

	const response = await api.get(endpoint, additionalHeaders);
	return response.data;
};

/**
 * @param {number} [userId]
 */
export const useUsers = (userId) => {
	const clinicId = useStore((state) => state.clinic.id);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	return useQuery({
		queryKey: ['users', userId],
		queryFn: () => fetchUsers(clinicId, { headers: { ...additionalHeaders } }, userId),
	});
};
