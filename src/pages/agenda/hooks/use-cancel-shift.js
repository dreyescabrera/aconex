import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 *
 * @param {number} profesionalId
 * @param {number} turnoId
 */
const eraseShift = async (profesionalId, turnoId) => {
	const res = await api.patch(`/turnos/anular/${profesionalId}/${turnoId}`);
	return res.data;
};

export const useCancelShift = () => {
	const queryClient = useQueryClient();

	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {number} data.turnoId
	 */
	const mutationFn = ({ profesionalId, turnoId }) => {
		return eraseShift(profesionalId, turnoId);
	};

	const mutation = useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['turnos'] }),
	});

	return mutation;
};
