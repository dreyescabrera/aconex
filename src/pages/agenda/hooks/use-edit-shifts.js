import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

const patchShifts = async (clinicId, shiftId, modifications) => {
	const res = await api.patch(`/turnos/${clinicId}/${shiftId}`, modifications);
	return res.data;
};

export const useEditShifts = () => {
	const queryClient = useQueryClient();

	const fakeClinicId = 1;

	/**
	 * @param {object} data
	 * @param {number} data.shiftId
	 * @param {string} [data.pacienteId]
	 * @param {string} [data.observacion]
	 * @param {string} [data.presentismo]
	 * @param {boolean} [data.habilitado]
	 * @param {string} [data.obraSocial]
	 */
	const mutationFn = (data) => {
		const { shiftId, ...modifications } = data;

		return patchShifts(fakeClinicId, shiftId, modifications);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['turnos'] }),
	});
};
