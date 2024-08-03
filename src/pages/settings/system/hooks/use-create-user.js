import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @typedef Perfil
 * @property {string} nombre - The first name.
 * @property {string} apellido - The last name.
 * @property {number} cedula - The identification number.
 * @property {number} celular - The phone number.
 * @property {string} direccion - The address.
 * @property {string} email - The email address.
 * @property {string} nacimiento - The date of birth (in the format "DD/MM/YYYY").
 */

/**
 * @param {number} clinicaId
 * @param {Perfil & {username: string, password: string}} user
 * @param {object} additionalHeaders
 */
async function createUser(clinicaId, user, additionalHeaders) {
	const { username, password, ...profile } = user;

	const profileResponse = await api.post('/perfiles/', profile, additionalHeaders);
	const res = await api.post(
		'/usuarios',
		{
			clinicaId,
			perfilId: profileResponse.data.data.id,
			username,
			password,
		},
		additionalHeaders
	);
	return res;
}

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {Perfil & {username: string, password: string}} profile
	 */
	const mutationFn = (profile) => {
		return createUser(id, profile, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users', id] }),
	});
};
