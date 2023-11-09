import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicaId
 * @param {number} [userId]
 */
async function fetchUsers(clinicaId, userId) {
	let endpoint = `/usuarios/${clinicaId}`;
	if (userId) endpoint += `/${userId}`;

	const response = await api.get(endpoint);
	return response.data;
}

/**
 * @param {number} [userId]
 */
export const useUsers = (userId) => {
	const clinicId = useStore((state) => state.clinic.id);

	return useQuery({ queryKey: ['users', userId], queryFn: () => fetchUsers(clinicId, userId) });
};
