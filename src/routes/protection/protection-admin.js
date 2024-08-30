import { useStore } from '@/store/use-store';
import { redirect } from 'react-router-dom';

export const protectionAdminRoute = () => {
	const { roleId } = useStore.getState().user;
	if (roleId !== 1) {
		return redirect('/not-found');
	}
	return null;
};
