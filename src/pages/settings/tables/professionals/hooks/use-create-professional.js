import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/*
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

/*
 * @param {number} clinicaId
 * @param {Professional} professional
 */
async function createProfessional(clinicaId, professional, additionalHeaders) {
	const { matricula, ...profile } = professional;
	let res = null;
	try {
		const { data: profileResponse } = await api.post('/perfiles', profile, additionalHeaders);
		res = await api.post(
			'/profesionales',
			{
				clinicaId,
				perfilId: profileResponse.data.id,
				matricula,
			},
			additionalHeaders
		);
	} catch (error) {
		if (error.response.status === 409) {
			res = await api.post(
				'/profesionales',
				{
					clinicaId,
					perfilId: error.response.data.data.id,
					matricula,
				},
				additionalHeaders
			);
		}
	}
	return res;
}

export const useCreateProfessional = (setCurrentStatus, setMessageError) => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/*
	 * @param {Professional} profile
	 */
	const mutationFn = (profile) => {
		return createProfessional(id, profile, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => {
			setCurrentStatus('success');
			queryClient.invalidateQueries({ queryKey: ['professionals'] });
		},
		/**
		 * @param {object} error
		 */
		onError: (error) => {
			setCurrentStatus('error');
			if (error.response.status === 409) {
				setMessageError(error.response.data.message);
			}
		},
	});
};
