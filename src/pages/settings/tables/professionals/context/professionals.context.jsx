import { createContext, useContext, useState } from 'react';
import { useProfessionals } from '@/hooks/use-professionals';

/**
 * @typedef {"newProfessional" | "editProfessional" | "newSchedule" | "editSchedule" | "newAbsence" | "editAbsence" | null} DrawerToOpen
 */

/* eslint-disable */
const initialData = {
	/**@type {Array<import('./types').Professional>} */
	professionals: undefined,
	/**@type {Array<import('./types').Professional>} */
	listToRender: [],
	/**@type {import('./types').Professional} */
	professionalInView: null,
	/**@type {import('./types').Schedule} */
	scheduleInView: null,
	/**@type {import('./types').Absence} */
	absenceInView: null,
	isDrawerOpen: false,
	/**@type {DrawerToOpen} */
	drawerToOpen: null,
	handleFilterChange: (event) => undefined,
	handleAutocompleteClick: (event, value) => undefined,
	openDrawer: (/**@type {DrawerToOpen} */ drawerToOpen) => undefined,
	closeDrawer: () => undefined,
	handleEditProfessional: (
		/**@type {import('./types').Professional} */ professional,
		/**@type {DrawerToOpen} */ drawerToOpen
	) => undefined,
	handleEditSchedule: (
		/**@type {import('./types').Professional} */ professional,
		/**@type {import('./types').Schedule} */ schedule,
		/**@type {DrawerToOpen} */ drawerToOpen
	) => undefined,
	handleEditAbsence: (
		/**@type {import('./types').Professional} */ professional,
		/**@type {import('./types').Absence} */ absence,
		/**@type {DrawerToOpen} */ drawerToOpen
	) => undefined,
	setProfessionalInView: (/**@type {import('./types').Professional} */ professional) => undefined,
	setScheduleInView: (/**@type {import('./types').Schedule} */ schedule) => undefined,
	setAbsenceInView: (/**@type {import('./types').Absence} */ absence) => undefined,
};
/* eslint-enable */

const ProfessionalsContext = createContext(initialData);

export const ProfessionalsProvider = ({ children }) => {
	const { data: professionals } = useProfessionals();

	const [professionalInView, setProfessionalInView] = useState(null);
	const [scheduleInView, setScheduleInView] = useState(null);
	const [absenceInView, setAbsenceInView] = useState(null);
	const [filteredProfessionals, setFilteredProfessionals] = useState([]);
	const [filterQuery, setFilterQuery] = useState('');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerToOpen, setDrawerToOpen] = useState(null);

	const listToRender = filterQuery ? filteredProfessionals : professionals;

	const openDrawer = (drawerToOpen) => {
		setDrawerToOpen(drawerToOpen);
		setIsDrawerOpen(true);
	};

	const closeDrawer = () => {
		setDrawerToOpen(null);
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

		const stringifiedProfessionals = professionals.map(
			(professional) =>
				`${professional.perfil.nombre} ${professional.perfil.apellido} ${professional.perfil.celular} ${professional.perfil.cedula}`
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
		setProfessionalInView,
		setScheduleInView,
		setAbsenceInView,
	};

	return <ProfessionalsContext.Provider value={state}>{children}</ProfessionalsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfessionalsContext = () => useContext(ProfessionalsContext);
