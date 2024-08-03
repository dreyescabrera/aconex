import { useStore } from '@/store/use-store';
import { clearUndefinedProperties } from '@/utils/clearUndefinedProperties';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getShifts = async (clinicId, params, additionalHeaders) => {
	const paramString = objectToQueryString(params);
	const { data } = await api.get(`/turnos/${clinicId}${paramString}`, {
		headers: { ...additionalHeaders },
	});
	return data;
};

/**
 * @param {object} [params]
 * @param {number} [params.professionalId]
 * @param {boolean} [params.libres]
 * @param {string} [params.fechaDesde]
 * @param {string} [params.fechaHasta]
 */
export const useShifts = (params) => {
	const clinic = useStore((state) => state.clinic);
	const clearedParams = clearUndefinedProperties(params);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	const response = useQuery({
		queryKey: ['turnos', clearedParams ?? {}],
		queryFn: () => getShifts(clinic.id, params, additionalHeaders),
		retry: 1,
	});

	return response;
};
