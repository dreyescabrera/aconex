import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @typedef Schedule
 * @property {number} profesionalId
 * @property {number} especialidadId
 * @property {number} clinicaId
 * @property {number} nroDia
 * @property {string} vigenciaDesde
 * @property {string} vigenciaHasta
 * @property {string} horaDesde
 * @property {string} horaHasta
 * @property {number} intervalo
 */

/**
 * @param {Schedule} schedule
 */
async function postSchedule(schedule) {
	const res = await api.post('/horarios', schedule);
	return res.data;
}

export const useCreateSchedule = () => {
	const { id } = useStore((state) => state.clinic);
	const queryClient = useQueryClient();

	/**
	 * @param {Omit<Schedule, 'clinicaId'>} schedule
	 */
	const mutationFn = (schedule) => {
		return postSchedule({ ...schedule, clinicaId: id });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
