import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @typedef Professional
 * @property {string} nombre - The first name.
 * @property {string} apellido - The last name.
 * @property {number} cedula - The identification number.
 * @property {number} celular - The phone number.
 * @property {string} direccion - The address.
 * @property {string} email - The email address.
 * @property {string} nacimiento - The date of birth (in the format "DD/MM/YYYY").
 * @property {string} matricula - The registration.
 */

/**
 * @param {number} clinicaId
 * @param {Professional} professional
 */
async function createProfessional(clinicaId, professional) {
	const { matricula, ...profile } = professional;

	const { data: profileResponse } = await api.post('/perfiles', profile);

	const res = await api.post('/profesionales', {
		clinicaId,
		perfilId: profileResponse.data.id,
		matricula,
	});

	return res;
}

export const useCreateProfessional = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);

	/**
	 * @param {Professional} profile
	 */
	const mutationFn = (profile) => {
		return createProfessional(id, profile);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
