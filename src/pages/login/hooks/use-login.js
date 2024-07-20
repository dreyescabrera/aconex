import { useStore } from '@/store/use-store';
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
	const res = await api.post('/auth/login', credentials);
	return res.data;
};

export const useLogin = () => {
	const { setClinic, setUser, setIsLoggedIn } = useStore();
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
			setClinic({ ...data.user.clinica });
			setUser({
				id: data.user.id,
				username: data.user.username,
				createdAt: data.user.createdAt,
				//perfilId: data.perfilId,
				token: data.token,
				perfil: data.user.perfil,
			});
			setIsLoggedIn(true);

			navigate('/home', { replace: true });
		},
	});

	return mutation;
};
