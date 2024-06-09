import React, { useState } from 'react';
import PlantTable from '../components/PlantTable';
import { usePlantsPaginated } from '../hooks/usePlants.ts';
import { Box, Button, CircularProgress, Pagination, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const PlantListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const { data: plantsResp, isFetching } = usePlantsPaginated(page);
    const navigate = useNavigate();

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            <Typography variant="h4">Plants</Typography>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" onClick={() => {navigate('create', { relative: 'path' });}}>
                    Create New Plant
                </Button>
            </Box>
            {plantsResp && !isFetching ? (
                <>
                    <PlantTable data={plantsResp.items} />
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Pagination count={plantsResp.pagination.totalPages} page={page} onChange={handlePageChange} />
                    </Box>
                </>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
};

export default PlantListPage;
