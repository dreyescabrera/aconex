import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

//import { ShiftOptions } from '../components/shifts/shift-options';

/*
 * @typedef ShiftOptions
 * @property {number} clinicaId
 * @property {number} profesionalId
 * @property {number} pacienteId
 * @property {number} observacion
 * @property {number} presentismo
 * @property {number} obraSocial
 * @property {string} date
 */

/*
 * @param {ShiftOptions} shiftInfo
 */
const createShift = async (shiftInfo, additionalHeaders) => {
	const res = await api.post('/turnos', shiftInfo, additionalHeaders);
	return res.data;
};

export const useNewShift = () => {
	const { id } = useStore((state) => state.clinic);
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/*
	 * @param {Omit<ShiftOptions, 'clinicaId'>} data
	 */
	const mutationFn = (data) => {
		return createShift({ clinicaId: id, ...data }, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['turnos'] });
		},
	});
};
