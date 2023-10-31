import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";

const updateProfile = async (profileId) => {
    try {
        const response = await api.patch(`/perfiles/${profileId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('error', error);

    }

}

// export const useUpdateProfile = (profileId) => {
//     return useMutation(() => updateProfile(profileId));
// };

export const useUpdateProfile = (profileId) => {
    return useMutation(() => updateProfile({
        mutationFn: profileId
    }));

};
