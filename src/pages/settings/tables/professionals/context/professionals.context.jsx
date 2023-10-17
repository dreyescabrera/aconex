import { createContext, useContext, useState } from 'react';
import { professionals } from './fake-data';

/**
 * @typedef {"newProfessional" | "editProfessional" | "newSchedule" | "editSchedule" | "newAbsence" | "editAbsence" | null} DrawerToOpen
 */

/* eslint-disable */
const initialData = {
	professionals,
	/**@type {Array<import('./fake-data').Professional>} */
	listToRender: [],
	/**@type {import('./fake-data').Professional} */
	professionalInView: null,
	/**@type {import('./fake-data').Schedule} */
	scheduleInView: null,
	/**@type {import('./fake-data').Absence} */
	absenceInView: null,
	isDrawerOpen: false,
	/**@type {DrawerToOpen} */
	drawerToOpen: null,
	handleFilterChange: (event) => undefined,
	handleAutocompleteClick: (event, value) => undefined,
	openDrawer: (/**@type {DrawerToOpen} */ drawerToOpen) => undefined,
	closeDrawer: () => undefined,
	handleEditProfessional: (
		/**@type {import('./fake-data').Professional} */ professional,
		/**@type {DrawerToOpen} */ drawerToOpen
	) => undefined,
	handleEditSchedule: (
		/**@type {import('./fake-data').Professional} */ professional,
		/**@type {import('./fake-data').Schedule} */ schedule,
		/**@type {DrawerToOpen} */ drawerToOpen
	) => undefined,
	handleEditAbsence: (
		/**@type {import('./fake-data').Professional} */ professional,
		/**@type {import('./fake-data').Absence} */ absence,
		/**@type {DrawerToOpen} */ drawerToOpen
	) => undefined,
};
/* eslint-enable */

const ProfessionalsContext = createContext(initialData);

export const ProfessionalsProvider = ({ children }) => {
	const [professionals] = useState(initialData.professionals);
	const [professionalInView, setProfessionalInView] = useState(null);
	const [scheduleInView, setScheduleInView] = useState(null);
	const [absenceInView, setAbsenceInView] = useState(null);
	const [filteredProfessionals, setFilteredProfessionals] = useState([]);
	const [filterQuery, setFilterQuery] = useState('');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerToOpen, setdrawerToOpen] = useState(null);

	const listToRender = filterQuery ? filteredProfessionals : professionals;

	const openDrawer = (drawerToOpen) => {
		setdrawerToOpen(drawerToOpen);
		setIsDrawerOpen(true);
	};

	const closeDrawer = () => {
		setdrawerToOpen(null);
		setIsDrawerOpen(false);
	};

	const handleEditProfessional = (professional, drawerToOpen) => {
		return () => {
			setProfessionalInView(professional);
			openDrawer(drawerToOpen);
		};
	};

	const handleEditSchedule = (professional, schedule, drawerToOpen) => {
		return () => {
			setProfessionalInView(professional);
			setScheduleInView(schedule);
			openDrawer(drawerToOpen);
		};
	};

	const handleEditAbsence = (professional, absence, drawerToOpen) => {
		return () => {
			setProfessionalInView(professional);
			setAbsenceInView(absence);
			openDrawer(drawerToOpen);
		};
	};

	const updateFilteredProfessionals = (newList) => {
		setFilteredProfessionals(newList);
	};

	const handleAutocompleteClick = (ev, value) => {
		if (!value) {
			setFilterQuery('');
			return;
		}

		setFilterQuery(ev.target.firstChild);
		updateFilteredProfessionals([value]);
	};

	const handleFilterChange = (ev) => {
		setFilterQuery(ev.target.value);

		const stringifiedProfessionals = professionals.map((professional) =>
			Object.values(professional).join(' ')
		);

		const filteredProfessionals = professionals.filter((_, index) =>
			stringifiedProfessionals[index].toLocaleLowerCase().includes(ev.target.value.toLowerCase())
		);

		updateFilteredProfessionals(filteredProfessionals);
	};

	const state = {
		professionals,
		listToRender,
		isDrawerOpen,
		drawerToOpen,
		professionalInView,
		scheduleInView,
		absenceInView,
		openDrawer,
		handleFilterChange,
		handleAutocompleteClick,
		closeDrawer,
		handleEditProfessional,
		handleEditSchedule,
		handleEditAbsence,
	};

	return <ProfessionalsContext.Provider value={state}>{children}</ProfessionalsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfessionalsContext = () => useContext(ProfessionalsContext);
