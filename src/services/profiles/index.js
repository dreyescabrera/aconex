import { api } from "@/services/api";

/**
 * @param {string} id Profile ID
 */

/**
 * @param {{nombre: string, apellido: string, cedula: number, celular: number, direccion: string, email: string, nacimiento: string}} body Profile data
 */
export const postProfile = async (body) => {
    const response = await api.post('/perfiles/', body);
    return response.data;
}

/**
 * @param {string} id Profile ID
 * @param {{nombre: string, apellido: string, cedula: number, celular: number, direccion: string, email: string, nacimiento: string}} body Profile data
 */

export const updateProfile = async (id, body) => {
    const response = await api.patch(`/perfiles/${id}`, body);
    return response.data;

};

