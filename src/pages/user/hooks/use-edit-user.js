import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicaId
 * @param {number} userId
 * @param {{username: string, password: string}} modifications
 */
const editUser = async (clinicaId, userId, modifications) => {
	const res = await api.patch(`/usuarios/${clinicaId}/${userId}`, modifications);
	return res.data;
};

export const useEditUser = () => {
	const queryClient = useQueryClient();
	const {
		clinic: { id },
		setUser,
	} = useStore();

	/**
	 * @param {object} data
	 * @param {number} data.userId
	 * @param {string} data.username
	 * @param {string} data.password
	 */
	const mutationFn = (data) => {
		const { userId, ...modifications } = data;
		return editUser(id, userId, modifications);
	};

	return useMutation({
		mutationFn,
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			setUser({ username: data.username });
		},
	});
};
