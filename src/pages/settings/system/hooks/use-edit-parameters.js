import { useStore } from '@/store/use-store';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @typedef ClinicUpdate
 * @property {string} condicionFiscal
 * @property {string } region
 * @property {string } username
 */

/**
 * @param {number} clinicaId
 * @param {Partial<ClinicUpdate>} modifications
 */
const updateClinicParameters = async (clinicaId, modifications) => {
	const endpoint = `/clinicas/${clinicaId}`;
	const response = await api.patch(endpoint, modifications);
	return response.data;
};

export const useEditParameters = () => {
	const { clinic, setClinic } = useStore();

	/**
	 * @param {Partial<ClinicUpdate>} modifications
	 */
	const mutationFn = (modifications) => {
		return updateClinicParameters(clinic.id, modifications);
	};

	return useMutation({
		mutationFn,
		onSuccess: (data) => {
			setClinic(data);
		},
	});
};
