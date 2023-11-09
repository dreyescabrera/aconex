import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

async function createUser(clinicaId, profile, userobj) {
	const profileResponse = await api.post('/perfiles/', profile);
	const res = await api.post('/usuarios', {
		clinicaId,
		perfilId: profileResponse.data.data.id,
		username: userobj.username,
		password: userobj.password,
	});
	return res;
}

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);

	const mutationFn = (datos) => {
		return createUser(id, datos[0], datos[1]);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getusers', id] }),
	});
};
