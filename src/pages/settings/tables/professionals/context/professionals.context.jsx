import { createContext, useContext, useState } from 'react';

/**
 * @typedef {object} Professional
 * @property {string} nombre
 * @property {string} apellido
 * @property {number} cedula
 * @property {number} celular
 * @property {string} direccion
 * @property {string} email
 * @property {Array<{nroDia: number, horaDesde: string, horaHasta: string}>} horarios
 * @property {Array<{id: string, fechaDesde: string, fechaHasta: string}>} ausencias
 */

const ausenciasFake = [
	{
		id: Math.random().toFixed(4),
		fechaDesde: '24/09/23',
		fechaHasta: '24/10/23',
	},
	{
		id: Math.random().toFixed(4),
		fechaDesde: '10/09/23',
		fechaHasta: '10/10/23',
	},
];

const horariosFake = [
	{
		nroDia: 1,
		horaDesde: '11:00:00',
		horaHasta: '20:00:00',
	},
	{
		nroDia: 2,
		horaDesde: '11:00:00',
		horaHasta: '20:00:00',
	},
	{
		nroDia: 3,
		horaDesde: '11:00:00',
		horaHasta: '20:00:00',
	},
	{
		nroDia: 4,
		horaDesde: '11:00:00',
		horaHasta: '20:00:00',
	},
	{
		nroDia: 5,
		horaDesde: '11:00:00',
		horaHasta: '20:00:00',
	},
	{
		nroDia: 6,
		horaDesde: '11:00:00',
		horaHasta: '20:00:00',
	},
	{
		nroDia: 7,
		horaDesde: '11:00:00',
		horaHasta: '20:00:00',
	},
];

/**
 * @type {Array<Professional>}
 */
const professionals = [
	{
		nombre: 'Luciano',
		apellido: 'Massa',
		cedula: 40823774,
		celular: 2643183732,
		direccion: 'calle 123',
		email: 'correo@gmail.com',
		horarios: [...horariosFake],
		ausencias: [...ausenciasFake],
	},
	{
		nombre: 'Diego',
		apellido: 'Reyes',
		cedula: 12345678,
		celular: 8889832730,
		email: 'correo@gmail.com',
		direccion: 'calle 456',
		horarios: [...horariosFake],
		ausencias: [...ausenciasFake],
	},
	{
		nombre: 'Harold',
		apellido: 'Alzate',
		cedula: 345678,
		celular: 3215457686,
		direccion: 'calle 789',
		email: 'correo@gmail.com',
		horarios: [...horariosFake],
		ausencias: [...ausenciasFake],
	},
];

/* eslint-disable */
const initialData = {
	professionals,
	/**@type {Array<Professional>} */
	filteredProfessionals: [],
	filterQuery: '',
	/**@type {Professional} */
	professionalInView: null,
	handleFilterChange: (event) => undefined,
	handleAutocompleteClick: (event, value) => undefined,
	changeProfessionalInView: (newProfessional) => undefined,
};
/* eslint-enable */

const ProfessionalsContext = createContext(initialData);

export const ProfessionalsProvider = ({ children }) => {
	const [professionals] = useState(initialData.professionals);
	const [professionalInView, setProfessionalInView] = useState(null);
	const [filteredProfessionals, setFilteredProfessionals] = useState([]);
	const [filterQuery, setFilterQuery] = useState('');

	const changeProfessionalInView = (newProfessional) => {
		setProfessionalInView(newProfessional);
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
		filteredProfessionals,
		filterQuery,
		professionalInView,
		handleFilterChange,
		handleAutocompleteClick,
		changeProfessionalInView,
	};

	return <ProfessionalsContext.Provider value={state}>{children}</ProfessionalsContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfessionals = () => useContext(ProfessionalsContext);
