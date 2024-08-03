import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

async function createAbsence(absence, additionalHeaders) {
	const response = await api.post('/ausencias', absence, additionalHeaders);
	return response.data;
}

export const useCreateAbsence = () => {
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {object} data
	 * @param {number} data.profesionalId
	 * @param {import('dayjs').Dayjs} data.vigenciaDesde
	 * @param {import('dayjs').Dayjs} data.vigenciaHasta
	 */
	const mutationFn = (data) => {
		return createAbsence(data, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	}); // configuracion para cuando yo llame a la funcion "mutate"
};
