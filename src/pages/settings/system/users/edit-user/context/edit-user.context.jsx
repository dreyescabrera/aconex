import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const viewTypes = /** @type {const} */ ({
	PROFILE_DATA: 'PROFILE_DATA',
	USER_DATA: 'USER_DATA',
});

/* eslint-disable */
const initialData = {
	/** @type { keyof typeof viewTypes} */
	view: viewTypes.PROFILE_DATA,
	updateView: (/** @type { keyof typeof viewTypes} */ newView) => undefined,
	editUser: {},
	updateEditUser: (editUser) => undefined,
};
/* eslint-enable */

const UserContext = createContext(initialData);

export const EditUserProvider = ({ children }) => {
	const [view, setView] = useState(viewTypes.PROFILE_DATA);
	const [editUser, setEditUser] = useState({});

	const updateView = (newView) => {
		setView(viewTypes[newView]);
		scrollTo({ top: 0, behavior: 'smooth' });
	};

	const updateEditUser = (editUser) => {
		setEditUser((prev) => ({ ...prev, ...editUser }));
	};

	const state = {
		view,
		updateView,
		editUser,
		updateEditUser,
	};

	return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditUser = () => useContext(UserContext);
