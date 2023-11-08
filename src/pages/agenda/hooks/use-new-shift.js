import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ShiftOptions } from '../components/shifts/shift-options';

/**
 * @typedef ShiftOptions
 * @property {number} clinicaId
 * @property {number} profesionalId
 * @property {number} pacienteId
 * @property {number} observacion
 * @property {number} presentismo
 * @property {number} obraSocial
 * @property {string} date
 */

/**
 * @param {ShiftOptions} shiftInfo
 */
const createShift = async (shiftInfo) => {
	const res = await api.post('/turnos', shiftInfo);
	return res.data;
};

export const useNewShift = () => {
	const { clinicaId } = useStore((state) => state.clinic);
	const queryClient = useQueryClient();

	/**
	 * @param {Omit<ShiftOptions, 'clinicaId'>} data
	 */
	const mutationFn = (data) => {
		return createShift({ clinicaId, ...data });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['turnos'] });
		},
	});
};
