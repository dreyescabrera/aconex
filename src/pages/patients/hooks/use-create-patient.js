import { useStore } from '@/store/use-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
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

/**
 * @param {number} clinicaId
 * @param {Patient} patient
 */
const createPatient = async (clinicaId, patient) => {
	const { CondIVA, ...profile } = patient;
	const profileResponse = await api.post('/perfiles', profile);
	const res = await api.post('/pacientes', {
		clinicaId,
		perfilId: profileResponse.data.data.id,
		CondIVA,
	});
	return res.data;
};

export const useCreatePatient = () => {
	const queryClient = useQueryClient();
	const { id } = useStore((state) => state.clinic);

	/**
	 * @param {Patient} patient
	 */
	const mutationFn = (patient) => {
		return createPatient(id, patient);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
	});
};
