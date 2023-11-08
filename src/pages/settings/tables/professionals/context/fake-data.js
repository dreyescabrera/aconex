/**
 * @typedef {object} Professional
 * @property {number} id
 * @property {object} perfil
 * @property {string} nombre
 * @property {string} apellido
 * @property {number} cedula
 * @property {number} celular
 * @property {string} direccion
 * @property {string} email
 * @property {Array<Schedule>} horarios
 * @property {Array<Absence>} ausencias
 */

/**
 * @typedef {object} Schedule
 * @property {number} id
 * @property {number} nroDia
 * @property {number} profesionalId
 * @property {number} especialidadId
 * @property {string} horaDesde
 * @property {string} horaHasta
 * @property {string} intervalo
 * @property {string} vigenciaDesde
 * @property {string} vigenciaHasta
 */

/**
 * @typedef {object} Absence
 * @property {number} id
 * @property {number} profesionalId
 * @property {string} vigenciaDesde
 * @property {string} vigenciaHasta
 */

/**
 * @type {Array<Absence>}
 */
const ausenciasFake = [
	{
		id: 0,
		profesionalId: 0,
		vigenciaDesde: '24/09/23',
		vigenciaHasta: '24/10/23',
	},
	{
		id: 0,
		profesionalId: 0,
		vigenciaDesde: '10/09/23',
		vigenciaHasta: '10/10/23',
	},
];

/**
 * @type {Array<Schedule>}
 */
const horariosFake = [
	{
		id: 0,
		nroDia: 1,
		profesionalId: 0,
		especialidadId: 0,
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		vigenciaDesde: '2023-03-15',
		vigenciaHasta: '2023-04-20',
	},
];

/**
 * @type {Array<Professional>}
 */
export const professionals = [
	{
		id: 0,
		perfil: 0,
		nombre: 'L',
		apellido: 'M',
		cedula: 40823774,
		celular: 2643183732,
		direccion: 'calle 123',
		email: 'correo@gmail.com',
		horarios: [...horariosFake],
		ausencias: [...ausenciasFake],
	},
];
