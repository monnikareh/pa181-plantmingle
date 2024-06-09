import PlantsApi from '../api/plantsApi';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useAllPlants = () => {
    const { data, isFetching } = useQuery({
        queryKey: ['plants'],
        queryFn: () => {return PlantsApi.getAll() }
    });

    console.log('Data from API:', data);

    return { data, isFetching };
};

export const usePlantCreate = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: (payload: any) => PlantsApi.createSingle(payload),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['allPlants'] });
        }
    });

    return { mutateAsync };
};

export const usePlantEdit = (id: number) => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: (payload: any) => PlantsApi.updateSingle(id, payload),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['allPlants'] });
        }
    });

    return { mutateAsync };
};

export const usePlantDelete = (id: number) => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: () => PlantsApi.deleteSingle(id),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['allPlants'] });
        }
    });

    return { mutateAsync };
};
