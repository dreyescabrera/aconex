import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

async function editschedule(data) {
	const urldata = data[0];
	const schedule = data[1];
	const response = await api.patch(urldata, schedule);
	return response;
}

async function deleteschedule(urldata) {
	const response = await api.delete(urldata);
	return response;
}

export const useEditschedule = () => {
	const queryClient = useQueryClient();
	const mutationFn = (data) => {
		return editschedule(data);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};

export const useDeleteschedule = () => {
	const queryClient = useQueryClient();
	const mutationFn = (data) => {
		return deleteschedule(data);
	};

	return useMutation({
		mutationFn,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['professionals'] }),
	});
};
