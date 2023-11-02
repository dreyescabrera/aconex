import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

// Axios
const getSpecialties = async (clinicId) => {
	const response = await api.get(`/especialidades/${clinicId}`);
	return response.data;
};

// Custom hook que utiliza React Query por detrás
export const useSpecialties = () => {
	const fakeClinicId = 1;

	return useQuery({
		queryKey: ['specialties', fakeClinicId],
		queryFn: () => getSpecialties(fakeClinicId),
	});
};
