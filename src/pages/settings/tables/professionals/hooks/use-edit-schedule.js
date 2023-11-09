import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @typedef ScheduleEditRequiredParams
 * @property {number} profesionalId
 * @property {number} horarioId
 */

/**
 * @typedef Schedule
 * @property {number} especialidadId
 * @property {number} nroDia
 * @property {string} vigenciaDesde
 * @property {string} vigenciaHasta
 * @property {string} horaDesde
 * @property {string} horaHasta
 * @property {number} intervalo
 */

/**
 * @param {ScheduleEditRequiredParams & Partial<Schedule>} data
 */
const editSchedule = async (data) => {
	const { profesionalId, horarioId, ...modifications } = data;

	const response = await api.patch(`/horarios/${profesionalId}/${horarioId}`, modifications);
	return response.data;
};

export const useEditSchedule = () => {
	const queryClient = useQueryClient();

	/**
	 * @param {ScheduleEditRequiredParams & Partial<Schedule>} data
	 */
	const mutationFn = (data) => {
		return editSchedule(data);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
