import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

// Axios
const getSpecialties = async (clinicId) => {
	const response = await api.get(`/especialidades/${clinicId}`);
	return response.data;
};

// Custom hook que utiliza React Query por detrás
export const useSpecialties = () => {
	const { clinicaId } = useStore((state) => state.clinic);

	return useQuery({
		queryKey: ['specialties', clinicaId],
		queryFn: () => getSpecialties(clinicaId),
	});
};
