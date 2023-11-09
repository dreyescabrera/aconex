import { useStore } from '@/store/use-store';
import { redirect } from 'react-router-dom';

export const loginLoader = () => {
	const isLoggedIn = useStore.getState().isLoggedIn;

	if (isLoggedIn) {
		return redirect('/home');
	}

	return null;
};
