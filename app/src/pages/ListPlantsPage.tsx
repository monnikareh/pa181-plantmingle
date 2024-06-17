import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, InputBase, styled, Typography} from '@mui/material';
import {useAllPlants} from '../hooks/usePlants';
import PlantTable from "../components/PlantTable.tsx";
import {Plant} from "../entities/Plant.ts"

const SearchBox = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: theme.shape.borderRadius,
    marginBottom: '10px',
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
    const {data: plantsResp, isFetching} = useAllPlants();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

    useEffect(() => {
        if (plantsResp) {
            console.log(plantsResp, searchQuery)
            setFilteredPlants(
                plantsResp.filter(plant =>
                    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [plantsResp, searchQuery]);

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        if (plantsResp) {
            setFilteredPlants(
                plantsResp.filter(plant =>
                    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    };

    return (
        <div style={{
            placeSelf: "start",
            display: "grid",
        }}>
            <Box style={{
                paddingBottom: '20px',
                margin: 0,
                minWidth: "100px"
            }}>
                <Box>
                    <Typography variant="h4" gutterBottom>Plants</Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                    <SearchBox>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search', style:{padding: "4px 15px"}}}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button variant="contained" color="primary" size="small" onClick={handleSearchClick}>
                            Search
                        </Button>
                    </SearchBox>
                </Box>
            </Box>
            <Box style={{
                paddingTop: '0px',
                paddingBottom: '20px',
                maxWidth: '100%',
                minWidth: '50vw',
                overflowX: 'auto',
            }}>
                {plantsResp && !isFetching ? (
                    <PlantTable data={(searchQuery) ? filteredPlants : plantsResp}/>
                ) : (
                    <Box display="flex" justifyContent="center" marginTop={4}>
                        <CircularProgress/>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default PlantListPage;
