import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/*
 * @typedef Patient
 * @property {string} nombre - The first name.
 * @property {string} apellido - The last name.
 * @property {number} cedula - The identification number.
 * @property {number} celular - The phone number.
 * @property {string} direccion - The address.
 * @property {string} email - The email address.
 * @property {string} nacimiento - The date of birth (in the format "DD/MM/YYYY").
 * @property {string} CondIVA - The VAT status.
 */

/*
 * @param {number} clinicaId
 * @param {Patient} patient
 */
const createPatient = async (clinicaId, patient, additionalHeaders) => {
	const { CondIVA, ...profile } = patient;
	let res = null;
	try {
		const profileResponse = await api.post('/perfiles', profile, additionalHeaders);
		let paciente = { clinicaId, perfilId: profileResponse.data.data.id };
		if (CondIVA) {
			paciente = { CondIVA, ...paciente };
		}
		res = await api.post('/pacientes', paciente, additionalHeaders);
	} catch (error) {
		if (error.response.status === 409) {
			let paciente = { clinicaId, perfilId: error.response.data.data.id };
			if (CondIVA) {
				paciente = { CondIVA, ...paciente };
			}
			res = await api.post('/pacientes', paciente, additionalHeaders);
		}
	}
	return res;
};

export const useCreatePatient = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/*
	 * @param {Patient} patient
	 */
	const mutationFn = (patient) => {
		return createPatient(id, patient, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
	});
};
