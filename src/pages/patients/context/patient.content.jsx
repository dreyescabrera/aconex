import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../../../services/api';

const getPatients = async (clinicaId) => {
	try {
		const response = await api.get(`/pacientes/${clinicaId}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const getClinicId = () => {
	const fakeClinicId = 1;
	return getPatients(fakeClinicId);
};
const getClinicData = async () => {
	try {
		const allPatients = await getClinicId();
		initialData.listToRender = allPatients;
	} catch (error) {
		throw error;
	}
};
getClinicData();

/**
 * @typedef {"newPatient" | "editPatient" | null } DrawerToOpen
 */

/* eslint-disable */
const initialData = {
	patientInVIew: null,
	/**@type {DrawerToOpen} */
	drawerToOpen: null,
	handleFilterChange: (event) => undefined,
	handleAutocompleteClick: (event, value) => undefined,
	openDrawer: (/**@type {DrawerToOpen} */ drawerToOpen) => undefined,
	closeDrawer: () => undefined,
	handleEditPatient: (patient, /**@type {DrawerToOpen} */ drawerToOpen) => undefined,
};
/* eslint-enable */
const PatientsContext = createContext(initialData);

export const PatientsProvider = ({ children }) => {
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		async function fetchPatients() {
			try {
				const allPatients = await getClinicId();
				setPatients(allPatients);
			} catch (error) {
				throw error;
			}
		}
		fetchPatients();
	}, []);

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
		const filteredPatients = patients.filter((patient) => {
			const stringifiedPatient = `${patient.perfil.nombre} ${patient.perfil.apellido} ${patient.cedula} ${patient.perfil.celular}`;
			const lowerCaseQuery = ev.target.value.toLowerCase();
			return stringifiedPatient.toLowerCase().includes(lowerCaseQuery);
		});
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
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePatientsContext = () => useContext(PatientsContext);
