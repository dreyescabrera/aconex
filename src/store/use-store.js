import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * @typedef Store
 * @property {boolean} isLoggedIn
 * @property {import('./types').ClinicaData | null} clinic
 * @property {import('./types').UserData | null} user
 * @property {(clinicData: import('./types').ClinicaData) => void} setClinic
 * @property {(userData: Partial<import('./types').UserData>) => void} setUser
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
			setUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
			setIsLoggedIn: (status) => set(() => ({ isLoggedIn: status })),
			doLogout: () => set(() => ({ clinic: null, isLoggedIn: false, user: null })),
		}),
		{ name: 'clinic-storage', storage: createJSONStorage(() => sessionStorage) }
	)
);
