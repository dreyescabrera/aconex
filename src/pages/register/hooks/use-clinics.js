import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getClinics = async () => {
	let endpoint = '/clinicas';
	const response = await api.get(endpoint);
	return response.data;
};

export const useClinics = () => {
	return useQuery({
		queryKey: ['clinics'],
		queryFn: () => getClinics(),
	});
};
