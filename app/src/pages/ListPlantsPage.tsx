import React from 'react';
import { CircularProgress, Typography} from '@mui/material';
import { useAllPlants } from '../hooks/usePlants';
import PlantTable from "../components/PlantTable.tsx";

const PlantListPage: React.FC = () => {
    const { data: plantsResp, isFetching } = useAllPlants();

    return (
        <div>
            <Typography variant="h4">Plants</Typography>
            {plantsResp && !isFetching ? (
                <>
                    <PlantTable data={plantsResp}/>
                </>
            ) : (
                <CircularProgress/>
            )}
        </div>
    );
};

export default PlantListPage;
