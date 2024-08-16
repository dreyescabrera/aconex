import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

const deleteUser = async (id, userId, additionalHeaders) => {
	const response = await api.delete(`usuarios/${id}/${userId}`, additionalHeaders);
	return response;
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {number} userId
	 */
	const mutationFn = (userId) => {
		return deleteUser(id, userId, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
	});
};
