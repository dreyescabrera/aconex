/**
import { UserData } from '../pages/settings/system/users/new-user/components/user-data';
 * @typedef {object} Profile
 * @property {number} id - The ID of the profile.
 * @property {string} nombre - The first name.
 * @property {string} apellido - The last name.
 * @property {number} cedula - The identification number.
 * @property {number} celular - The phone number.
 * @property {string} direccion - The address.
 * @property {string} email - The email address.
 * @property {string | null} imagen - The image URL, if available; otherwise null.
 * @property {string} nacimiento - The date of birth.
 */

/**
 * @typedef {object} ClinicaData
 * @property {number} id - The ID of the clinic data.
 * @property {number} perfilId - The profile ID associated with the clinic data.
 * @property {string} username - The username of the clinic.
 * @property {string} condicionFiscal - The fiscal condition.
 * @property {string} region - The region (e.g., ARG for Argentina).
 * @property {string} createdAt - The creation timestamp.
 * @property {Profile} perfil - The profile details associated with the clinic.
 */

/**
 * @typedef {object} UserData
 * @property {number} id - The id of the user.
 * @property {string} username - The username of the user.
 * @property {number} perfilId - The profile ID associated with the user data.
 * @property {string} createdAt - The creation timestamp.
 * @property {Profile} perfil - The profile details associated with the clinic.
 * @property {string} token - The profile details associated with the clinic.
 */

export {};
