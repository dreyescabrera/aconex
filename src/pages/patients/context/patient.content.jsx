import { createContext, useContext, useState } from 'react';
import { patients } from './fake-data';

/**
 * @typedef {"newPatient" | "editPatient" | null } DrawerToOpen
 */

/* eslint-disable */
const initialData = {
	patients,
	/**@type {Array<import('./fake-data').Patient>} */
	listToRender: [],
	/**@type {import('./fake-data').Patient} */
	patientInVIew: null,
	/**@type {DrawerToOpen} */
	drawerToOpen: null,
	handleFilterChange: (event) => undefined,
	handleAutocompleteClick: (event, value) => undefined,
	openDrawer: (/**@type {DrawerToOpen} */ drawerToOpen) => undefined,
	closeDrawer: () => undefined,
	handleEditPatient: (
		/**@type {import('./fake-data').Patient} */ patient,
		/**@type {DrawerToOpen} */ drawerToOpen
	) => undefined,
};
/* eslint-enable */
const PatientsContext = createContext(initialData);

export const PatientsProvider = ({ children }) => {
	const [patients] = useState(initialData.patients);
	const [patientInVIew, setPatientInView] = useState(null);
	const [filteredPatients, setFilteredPatients] = useState([]);
	const [filterQuery, setFilterQuery] = useState('');
	const [drawerToOpen, setdrawerToOpen] = useState(null);

	const listToRender = filterQuery ? filteredPatients : patients;

	const openDrawer = (drawerToOpen) => {
		setdrawerToOpen(drawerToOpen);
	};
	const closeDrawer = () => {
		setdrawerToOpen(null);
	};
	const handleEditPatient = (patient, drawerToOpen) => {
		return () => {
			setPatientInView(patient);
			openDrawer(drawerToOpen);
		};
	};
	const updateFilteredPatients = (newList) => {
		setFilteredPatients(newList);
	};
	const handleAutocompleteClick = (ev, value) => {
		if (!value) {
			setFilterQuery('');
			return;
		}
		setFilterQuery(ev.target.firstChild);
		updateFilteredPatients([value]);
	};

	const handleFilterChange = (ev) => {
		setFilterQuery(ev.target.value);
		const stringifiedPatients = patients.map((patient) => Object.values(patient).join(' '));
		const filteredPatients = patients.filter((_, index) =>
			stringifiedPatients[index].toLocaleLowerCase().includes(ev.target.value.toLowerCase())
		);
		updateFilteredPatients(filteredPatients);
	};
	const state = {
		patients,
		patientInVIew,
		drawerToOpen,
		listToRender,
		openDrawer,
		closeDrawer,
		handleEditPatient,
		handleAutocompleteClick,
		handleFilterChange,
	};
	return <PatientsContext.Provider value={state}>{children}</PatientsContext.Provider>;
}; // eslint-disable-next-line react-refresh/only-export-components
export const usePatientsContext = () => useContext(PatientsContext);
