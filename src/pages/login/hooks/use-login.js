import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

	/**
	 * @param {Credentials} credentials
	 */
	const mutationFn = (credentials) => {
		return postLogin(credentials);
	};

	const mutation = useMutation({
		mutationFn,
		onSuccess: (data) => {
			const stringifiedData = JSON.stringify(data);
			sessionStorage.setItem('loggedUserData', stringifiedData);
			navigate('/home', { replace: true });
		},
	});

	return mutation;
};
