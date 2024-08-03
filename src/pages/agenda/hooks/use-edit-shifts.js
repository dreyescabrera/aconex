import { useStore } from '@/store/use-store';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

const patchShifts = async (professionalId, shiftId, modifications, additionalHeaders) => {
	const res = await api.patch(`/turnos/${professionalId}/${shiftId}`, modifications, {
		headers: { ...additionalHeaders },
	});
	return res.data;
};

export const useEditShifts = () => {
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};

	/*
	 * @param {object} data
	 * @param {number} data.shiftId
	 * @param {number} data.profesionalId
	 * @param {string} [data.pacienteId]
	 * @param {string} [data.observacion]
	 * @param {string} [data.presentismo]
	 * @param {boolean} [data.habilitado]
	 * @param {string} [data.obraSocial]
	 */
	const mutationFn = (data) => {
		const { shiftId, profesionalId, ...modifications } = data;

		return patchShifts(profesionalId, shiftId, modifications, additionalHeaders);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['turnos'] }),
	});
};
