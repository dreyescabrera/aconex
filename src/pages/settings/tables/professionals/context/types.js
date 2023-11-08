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

export {};
