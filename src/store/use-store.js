import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * @typedef Store
 * @property {boolean} isLoggedIn
 * @property {object | null} clinic
 * @property {object | null} user
 * @property {(clinicData: object) => void} setClinic
 * @property {(userData: object) => void} setUser
 * @property {(status: boolean) => void} setIsLoggedIn
 * @property {() => void} doLogout
 */

/**
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<Store>>}
 */
export const useStore = create(
	persist(
		(set) => ({
			isLoggedIn: false,
			clinic: null,
			user: null,
			setClinic: (clinicData) => set(() => ({ clinic: clinicData })),
			setUser: (userData) => set(() => ({ user: userData })),
			setIsLoggedIn: (status) => set(() => ({ isLoggedIn: status })),
			doLogout: () => set(() => ({ clinic: null, isLoggedIn: false, user: null })),
		}),
		{ name: 'clinic-storage', storage: createJSONStorage(() => sessionStorage) }
	)
);
