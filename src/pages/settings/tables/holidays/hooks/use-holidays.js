import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @param {number} clinicId
 * @param {number} [holidayId]
 */
const getHolidays = async (clinicId, holidayId) => {
	let endpoint = `/feriados/${clinicId}`;
	if (holidayId) endpoint += `/${holidayId}`;

	const res = await api.get(endpoint);
	return res.data;
};

export const useHolidays = (holidayId) => {
	const { id } = useStore((state) => state.clinic);

	return useQuery({
		queryKey: ['holidays', holidayId],
		queryFn: () => getHolidays(id, holidayId),
	});
};
