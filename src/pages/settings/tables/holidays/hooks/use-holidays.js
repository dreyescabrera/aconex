import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicId
 * @param {object} additionalHeaders
 * @param {number} [holidayId]
 */
const getHolidays = async (clinicId, additionalHeaders, holidayId) => {
	let endpoint = `/feriados/${clinicId}`;
	if (holidayId) endpoint += `/${holidayId}`;

	const res = await api.get(endpoint, additionalHeaders);
	return res.data;
};

export const useHolidays = (holidayId) => {
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	return useQuery({
		queryKey: ['holidays', holidayId],
		queryFn: () => getHolidays(id, { headers: { ...additionalHeaders } }, holidayId),
	});
};
