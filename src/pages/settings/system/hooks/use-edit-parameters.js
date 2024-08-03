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
 * @param {object} additionalHeaders
 */
const updateClinicParameters = async (clinicaId, modifications, additionalHeaders) => {
	const endpoint = `/clinicas/${clinicaId}`;
	const response = await api.patch(endpoint, modifications, additionalHeaders);
	return response.data;
};

export const useEditParameters = () => {
	const { clinic, setClinic } = useStore();
	const user = useStore((state) => state.user);
	const additionalHeaders = {
		Authorization: `Bearer ${user.token}`,
	};
	/**
	 * @param {Partial<ClinicUpdate>} modifications
	 */
	const mutationFn = (modifications) => {
		return updateClinicParameters(clinic.id, modifications, { headers: { ...additionalHeaders } });
	};

	return useMutation({
		mutationFn,
		onSuccess: (data) => {
			setClinic(data);
		},
	});
};
