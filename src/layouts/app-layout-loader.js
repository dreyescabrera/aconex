import { useStore } from '@/store/use-store';
import { redirect } from 'react-router-dom';

export const appLayoutLoader = () => {
	const isUserLoggedIn = useStore.getState().isLoggedIn;

	if (!isUserLoggedIn) {
		return redirect('/login');
	}

	return null;
};
