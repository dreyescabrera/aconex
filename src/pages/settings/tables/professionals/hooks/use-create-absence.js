import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

async function createAbsence(absence) {
	const response = await api.post('/ausencias', absence);
	return response.data;
}

export const useCreateAbsence = () => {
	const queryClient = useQueryClient();

	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {import('dayjs').Dayjs} data.vigenciaDesde
	 * @param {import('dayjs').Dayjs} data.vigenciaHasta
	 */
	const mutationFn = (data) => {
		return createAbsence(data);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	}); // configuracion para cuando yo llame a la funcion "mutate"
};
