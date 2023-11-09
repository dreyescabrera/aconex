import { clearUndefinedProperties } from '@/utils/clearUndefinedProperties';
import dayjs from 'dayjs';
import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * @typedef {'mobileFilter' | 'shiftOptions' | 'emptyShiftOptions' | null} DrawerToOpen
 */

/**
 * @typedef Filters
 * @property {number} profesionalId
 * @property {number} especialidadId
 * @property {boolean | undefined} libres
 * @property {string} fechaDesde
 * @property {string} fechaHasta
 */

const initialFilters = {
	fechaDesde: dayjs().format('MM-DD-YY'),
	fechaHasta: dayjs().format('MM-DD-YY'),
};

/* eslint-disable */
const initialData = {
	/**@type {URLSearchParams} */
	filters: undefined,
	updateFilters: (/** @type {Partial<Filters>} */ filters) => undefined,
	shiftInView: null,
	handleShiftOptions: (shift, /** @type {DrawerToOpen} */ drawerToOpen) => undefined,
	/**@type {DrawerToOpen} */
	drawerToOpen: null,
	openDrawer: (/** @type {DrawerToOpen} */ drawerToOpen) => undefined,
	closeDrawer: () => undefined,
};
/* eslint-enable */

const AgendaContext = createContext(initialData);

export const AgendaProvider = ({ children }) => {
	const [filters, setFilters] = useSearchParams(initialFilters);

	const [shiftInView, setShiftInView] = useState(initialData.shiftInView);

	const [drawerToOpen, setDrawerToOpen] = useState(null);

	const updateFilters = (newFilters) => {
		setFilters((prevParams) => {
			const clearedPrevParams = clearUndefinedProperties(Object.fromEntries(prevParams.entries()));
			return {
				...clearedPrevParams,
				...newFilters,
			};
		});
	};

	const openDrawer = (drawerToOpen) => {
		setDrawerToOpen(drawerToOpen);
	};

	const closeDrawer = () => {
		setDrawerToOpen(null);
	};

	const handleShiftOptions = (shift, drawerToOpen) => {
		return () => {
			setShiftInView(shift);
			openDrawer(drawerToOpen);
		};
	};

	const state = {
		filters,
		updateFilters,
		shiftInView,
		handleShiftOptions,
		drawerToOpen,
		openDrawer,
		closeDrawer,
	};

	return <AgendaContext.Provider value={state}>{children}</AgendaContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAgendaContext = () => useContext(AgendaContext);
