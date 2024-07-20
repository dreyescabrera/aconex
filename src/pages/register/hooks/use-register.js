import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

/**
 * @typedef NewUsuario
 * @property {object} [usuario]
 * @property {number} [usuario.clinicaId]
 * @property {string} [usuario.username]
 * @property {string} [usuario.password]
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
 * @param {NewUsuario} newUsuario
 */
const postRegister = async (newUsuario) => {
	const res = await api.post('/auth/register', newUsuario);
	return res.data;
};

export const useRegister = () => {
	const navigate = useNavigate();
	/**
	 * @param {NewUsuario} newUsuario
	 */
	const mutationFn = (newUsuario) => {
		return postRegister(newUsuario);
	};

	const mutation = useMutation({
		mutationFn,
		onSuccess: () => {
			navigate('/login');
		},
	});

	return mutation;
};
