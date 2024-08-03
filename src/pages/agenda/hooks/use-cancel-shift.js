import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 *
 * @param {number} profesionalId
 * @param {number} turnoId
 * @param {object} additionalHeaders
 */
const eraseShift = async (profesionalId, turnoId, additionalHeaders) => {
	const res = await api.patch(`/turnos/anular/${profesionalId}/${turnoId}`, {}, additionalHeaders);
	return res.data;
};

export const useCancelShift = () => {
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {number} data.turnoId
	 */
	const mutationFn = ({ profesionalId, turnoId }) => {
		return eraseShift(profesionalId, turnoId, { headers: { ...additionalHeaders } });
	};

	const mutation = useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['turnos'] }),
	});

	return mutation;
};
