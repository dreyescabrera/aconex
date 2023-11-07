import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api';

/**
 * @typedef Credentials
 * @property {string} usernameclinica
 * @property {string} username
 * @property {string} password
 */

/**
 * @param {Credentials} credentials
 */
const postLogin = async (credentials) => {
	const res = await api.post('/usuarios/login', credentials);
	return res.data;
};

export const useLogin = () => {
	/**
	 * @param {Credentials} credentials
	 */
	const mutationFn = (credentials) => {
		return postLogin(credentials);
	};

	const mutation = useMutation({ mutationFn });
	return mutation;
};
