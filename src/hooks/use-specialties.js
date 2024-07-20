import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

// Axios
const getSpecialties = async (clinicId, additionalHeaders) => {
	const response = await api.get(`/especialidades/${clinicId}`, additionalHeaders);
	return response.data;
};

// Custom hook que utiliza React Query por detrás
export const useSpecialties = () => {
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		headers: { Authorization: `Bearer ${user.token}` },
	};
	return useQuery({
		queryKey: ['specialties', id],
		queryFn: () => getSpecialties(id, additionalHeaders),
	});
};
