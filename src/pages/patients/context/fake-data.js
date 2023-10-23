/**
 * @typedef {object} Patient
 * @property {string} nombre
 * @property {string} apellido
 * @property {number} cedula
 * @property {number} celular
 * @property {string} email
 * @property {string} direccion
 * @property {string} nacimiento
 */

/**
 * @type {Array<Patient>}
 */

export const patients = [
    {
        nombre: 'Luciano',
        apellido: 'Massa',
        cedula: 40823774,
        celular: 2643183732,
        direccion: 'calle 123',
        email: 'luciano@gmail.com',
        nacimiento: '12/02/1998',
    },
    {
        nombre: 'Harold',
        apellido: 'Alzate',
        cedula: 111507428,
        celular: 3117435713,
        direccion: 'calle 123',
        email: 'harold@gmail.com',
        nacimiento: '27/06/1992',
    },
]