import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicaId
 * @param {number} userId
 * @param {{username: string, password: string}} modifications
 * @param {object} additionalHeaders
 */
const editUser = async (clinicaId, userId, modifications, additionalHeaders) => {
	const res = await api.patch(`/usuarios/${clinicaId}/${userId}`, modifications, additionalHeaders);
	return res.data;
};

export const useEditUser = () => {
	const queryClient = useQueryClient();
	const {
		clinic: { id },
		setUser,
	} = useStore();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {object} data
	 * @param {number} data.userId
	 * @param {string} data.username
	 * @param {string} data.password
	 */
	const mutationFn = (data) => {
		const { userId, ...modifications } = data;
		return editUser(id, userId, modifications, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			setUser({ username: data.username });
		},
	});
};
