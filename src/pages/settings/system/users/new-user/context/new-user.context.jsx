import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const viewTypes = /** @type {const} */ ({
	PROFILE_DATA: 'PROFILE_DATA',
	USER_DATA: 'USER_DATA',
});

/**
 * @typedef User
 * @property {string} nombre - The first name.
 * @property {string} apellido - The last name.
 * @property {number} cedula - The identification number.
 * @property {number} celular - The phone number.
 * @property {string} direccion - The address.
 * @property {string} email - The email address.
 * @property {string} nacimiento - The date of birth (in the format "DD/MM/YYYY").
 * @property {string} username
 * @property {string} password
 */

/* eslint-disable */
const initialData = {
	/** @type { keyof typeof viewTypes} */
	view: viewTypes.PROFILE_DATA,
	updateView: (/** @type { keyof typeof viewTypes} */ newView) => undefined,
	/**@type {User} */
	newUser: undefined,
	updateNewUser: (/**@type {Partial<User>} */ newUser) => undefined,
};
/* eslint-enable */

const UserContext = createContext(initialData);

export const NewUserProvider = ({ children }) => {
	const [view, setView] = useState(viewTypes.PROFILE_DATA);
	const [newUser, setNewUser] = useState(undefined);

	const updateView = (newView) => {
		setView(viewTypes[newView]);
		scrollTo({ top: 0, behavior: 'smooth' });
	};

	const updateNewUser = (newUser) => {
		setNewUser((prev) => {
			const prevUserData = prev ?? {};
			return { ...prevUserData, ...newUser };
		});
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
