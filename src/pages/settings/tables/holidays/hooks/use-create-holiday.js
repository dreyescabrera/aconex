import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {object} data
 * @param {number} data.clinicaId
 * @param {string} data.descripcion
 * @param {string} data.fecha
 */
async function createHoliday(data) {
	const res = api.post('/feriados', data);
	return res;
}

export const useCreateHoliday = () => {
	const { id } = useStore((state) => state.clinic);
	const queryClient = useQueryClient();

	/**
	 * @param {object} data
	 * @param {string} data.descripcion
	 * @param {string} data.fecha
	 */
	const mutationFn = (data) => {
		return createHoliday({ clinicaId: id, ...data });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['holidays'] }),
	});
};
