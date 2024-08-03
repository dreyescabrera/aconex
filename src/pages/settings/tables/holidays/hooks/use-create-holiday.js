import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {object} data
 * @param {number} data.clinicaId
 * @param {string} data.descripcion
 * @param {string} data.fecha
 * @param {object} additionalHeaders
 */
async function createHoliday(data, additionalHeaders) {
	const res = api.post('/feriados', data, additionalHeaders);
	return res;
}

export const useCreateHoliday = () => {
	const { id } = useStore((state) => state.clinic);
	const queryClient = useQueryClient();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {object} data
	 * @param {string} data.descripcion
	 * @param {string} data.fecha
	 */
	const mutationFn = (data) => {
		return createHoliday({ clinicaId: id, ...data }, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['holidays'] }),
	});
};
