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
 * @param {Perfil} profile
 */
async function createProfessional(clinicaId, profile) {
	const profileResponse = await api.post('/perfiles', profile);
	const res = await api.post('/profesionales', {
		clinicaId,
		perfilId: profileResponse.data.data.id,
	});
	return res;
}

export const useCreateProfessional = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);

	/**
	 * @param {Perfil} profile
	 */
	const mutationFn = (profile) => {
		return createProfessional(id, profile);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
