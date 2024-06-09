import PlantsApi from '../api/plantsApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


export const usePlants = () => {
    const { data, isFetching } = useQuery({
        queryKey: ['plants'],
        queryFn: () => { return PlantsApi.getAll()}
    });
    return { data, isFetching };
};

export const usePlantsPaginated = (page: number) => {
    const { data, isFetching } = useQuery({
        queryKey: ['plants', page],
        queryFn: () => { return PlantsApi.getAllPaginated(page)}
    });
    return { data, isFetching };
}


export const usePlantCreate = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: (payload: any) => PlantsApi.createSingle(payload),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['plants'] });
        }
    });
    return { mutateAsync };
};

export const usePlantEdit = (id: number) => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: (payload: any) => PlantsApi.updateSingle(id, payload),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['plants'] });
        }
    });
    return { mutateAsync };
};


export const usePlantDelete = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => PlantsApi.deleteSingle(id),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['plants'] });
        }
    });
};
