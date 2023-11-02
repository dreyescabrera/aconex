import { objectToQueryString } from '@/utils/objectToQueryString';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getShifts = async (clinicId, params) => {
	const paramString = objectToQueryString(params);
	const { data } = await api.get(`/turnos/${clinicId}${paramString}`);
	return data;
};

/**
 * @param {number} clinicId
 * @param {object} [params]
 * @param {number} [params.professionalId]
 * @param {boolean} [params.libres]
 * @param {string} [params.fechaDesde]
 * @param {string} [params.fechaHasta]
 */
export const useShifts = (clinicId, params) => {
	const response = useQuery({
		queryKey: ['turnos', params ?? {}],
		queryFn: () => getShifts(clinicId, params),
		retry: 1,
	});

	return response;
};
