/**
 * @typedef {object} Professional
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
 * @property {number} nroDia
 * @property {string} especialidad
 * @property {string} horaDesde
 * @property {string} horaHasta
 * @property {string} intervalo
 * @property {string} fechaDesde
 * @property {string} fechaHasta
 */

/**
 * @typedef {object} Absence
 * @property {string} id
 * @property {string} fechaDesde
 * @property {string} fechaHasta
 */

/**
 * @type {Array<Absence>}
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

/**
 * @type {Array<Schedule>}
 */
const horariosFake = [
	{
		nroDia: 1,
		especialidad: 'Cirugia',
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		fechaDesde: '2023-03-14',
		fechaHasta: '2023-04-20',
	},
	{
		nroDia: 2,
		especialidad: 'Cirugia',
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		fechaDesde: '2023-03-14',
		fechaHasta: '2023-04-20',
	},
	{
		nroDia: 3,
		especialidad: 'Cirugia',
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		fechaDesde: '2023-03-14',
		fechaHasta: '2023-04-20',
	},
	{
		nroDia: 4,
		especialidad: 'Cirugia',
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		fechaDesde: '2023-03-14',
		fechaHasta: '2023-04-20',
	},
	{
		nroDia: 5,
		especialidad: 'Cirugia',
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		fechaDesde: '2023-03-14',
		fechaHasta: '2023-04-20',
	},
	{
		nroDia: 6,
		especialidad: 'Cirugia',
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		fechaDesde: '2023-03-14',
		fechaHasta: '2023-04-20',
	},
	{
		nroDia: 7,
		especialidad: 'Cirugia',
		horaDesde: '11:00',
		horaHasta: '20:00',
		intervalo: '00:40',
		fechaDesde: '2023-03-14',
		fechaHasta: '2023-04-20',
	},
];

/**
 * @type {Array<Professional>}
 */
export const professionals = [
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
