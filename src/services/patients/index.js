import { api } from "@/services/api";

const endpoint = 'pacientes'

/**
 * Get an array of patients by clinicaId.
 * @param {number} clinicaId - The ID of the clinica.
 * @returns {Promise<Array<Object>>} Array of patient objects.
 */
export const getPatients = async (clinicaId) => {
    const response = await api.get(`${endpoint}/${clinicaId}`);
    return response.data;
};

/**
 * Get a patient by clinicaId and profileId.
  * @param {number} clinicaId - The ID of the clinica.
 * @param {number} perfilId - The ID of the perfil.
 * @returns {Promise<Object>} The patient object.
 */
export const getPatient = async (clinicaId, perfilId) => {
    const response = await api.get(`${endpoint}/${clinicaId}/${perfilId}`);
    return response.data;
};

/**
 * Create a new patient.
 * @param {{clinicaId: number, perfilId: number}} body -
 * @returns {Promise<Object>} The created patient object.
 */
export const createPatient = async (body) => {
    const response = await api.post(endpoint, body);
    return response.data;
}

/**
 * Delete a patient by clinicaId and perfilId.
 * @param {number} clinicaId - The ID of the clinica.
 * @param {number} perfilId - The ID of the perfil.
 * @returns {Promise<Object>} The deleted patient object.
 */
export const deletePatient = async (clinicaId, perfilId) => {
    const response = await api.delete(`${endpoint}/${clinicaId}/${perfilId}`);
    return response.data;
};
