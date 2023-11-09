import { useStore } from '@/store/use-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

async function fetchusers(clinicaId) {
	const endpoint = `/usuarios/${clinicaId}`;
	const response = await api.get(endpoint);
	return response;
}

export const useUsers = () => {
	const clinicId = useStore((state) => state.clinic.id);
	return useQuery({ queryFn: () => fetchusers(clinicId), queryKey: ['getusers', clinicId] });
};
