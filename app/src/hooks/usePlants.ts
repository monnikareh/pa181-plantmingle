import PlantsApi from '../api/plantsApi';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Plant} from "../../../backend/src/entities/Plant.ts"
import {useEffect, useState} from "react";

export const useAllPlants = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState<Plant[] | undefined>(undefined);

    const fetchPlants = async () => {
        setIsFetching(true);
        try {
            const plantsData: Plant[] = await PlantsApi.getAll();
            setData(plantsData);
        } catch (error) {
            console.error('Error fetching plants:', error);
        }
        setIsFetching(false);
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    console.log('Data:', data);
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
