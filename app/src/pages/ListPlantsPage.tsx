import React from 'react';
import { Typography, Box, Button, CircularProgress, InputBase, styled } from '@mui/material';
import { useAllPlants } from '../hooks/usePlants';
import PlantTable from "../components/PlantTable.tsx";

const SearchBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: theme.shape.borderRadius,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    margin: '10px',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
    '& > *': {
        flex: 1,
    },
    '& button': {
        marginLeft: theme.spacing(1),
    },
}));

const PlantListPage: React.FC = () => {
    const { data: plantsResp, isFetching } = useAllPlants();

    return (
        <Box style={{ paddingTop: '0px', paddingBottom: '20px', margin: 0, width: '100%' }}>
            <Box style={{ paddingTop: '40px', paddingBottom: '20px'}}>
                <Typography variant="h4" gutterBottom>Plants</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
                <SearchBox>
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <Button variant="contained" color="primary" size="small">Search</Button>
                </SearchBox>
            </Box>
            <Box style={{ backgroundColor: 'yellow', margin: '20px', width: '100%'}}>
                {plantsResp && !isFetching ? (
                    <PlantTable data={plantsResp} />
                ) : (
                    <Box display="flex" justifyContent="center" marginTop={4}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default PlantListPage;
