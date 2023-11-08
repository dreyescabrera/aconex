import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

async function fetchspecialties() {
	const res = await api.get('/especialidades/1'); //Es Necesario especificar la clinica que maneja tales especialidades (especialidades/1)
	return res;
}

export const useGetspecialties = () => {
	const response = useQuery(['specialtieslist'], fetchspecialties);

	if (response.status === 'loading') {
		return [];
	}

	if (response.status === 'error') {
		alert('Error al obtener datos de especialidades');
		return [];
	}

	if (response.status === 'success') {
		return response.data.data;
	}

	return [];
};
