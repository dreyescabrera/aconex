import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

/**
 * @typedef NewClinic
 * @property {object} [clinica]
 * @property {string} [clinica.username]
 * @property {number} [clinica.perfilId]
 * @property {string} [clinica.condicionFiscal]
 * @property {string} [clinica.region]
 * @property {object} [perfil]
 * @property {string} [perfil.nombre]
 * @property {string} [perfil.apellido]
 * @property {string} [perfil.email]
 * @property {number} [perfil.cedula]
 * @property {number} [perfil.celular]
 * @property {string} [perfil.direccion]
 * @property {string} [perfil.nacimiento]
 */

/**
 * @param {NewClinic} newClinic
 */
const postRegister = async (newClinic) => {
	const res = await api.post('/clinicas', newClinic);
	return res.data;
};
export const useRegisterClinic = (setIsError) => {
	const navigate = useNavigate();
	/**
	 * @param {NewClinic} newClinic
	 */
	const mutationFn = (newClinic) => {
		return postRegister(newClinic);
	};

	const mutation = useMutation({
		mutationFn,
		onSuccess: () => {
			navigate('/register');
		},
		/**
		 * @param {object} error
		 */
		onError: (error) => {
			setIsError(error?.response?.data?.message);
		},
	});

	return mutation;
};
