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
	newUser: {},
	updateNewUser: (newUser) => undefined,
};
/* eslint-enable */

const UserContext = createContext(initialData);

export const NewUserProvider = ({ children }) => {
	const [view, setView] = useState(viewTypes.PROFILE_DATA);
	const [newUser, setNewUser] = useState({});

	const updateView = (newView) => {
		setView(viewTypes[newView]);
		scrollTo({ top: 0, behavior: 'smooth' });
	};

	const updateNewUser = (newUser) => {
		setNewUser((prev) => ({ ...prev, ...newUser }));
	};

	const state = {
		view,
		updateView,
		newUser,
		updateNewUser,
	};

	return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNewUser = () => useContext(UserContext);
