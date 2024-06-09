import React, { useState } from 'react';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAllPlants } from '../hooks/usePlants';
import { useNavigate } from 'react-router-dom';
import flowerImage from '../assets/flower.png';


const PlantsSwipePage: React.FC = () => {
    const { data: plantsResp, isFetching } = useAllPlants();
    const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
    const navigate = useNavigate();

    if (isFetching || !plantsResp) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    const handleNextPlant = () => {
        setCurrentPlantIndex((prevIndex) => (prevIndex + 1) % plantsResp.length);
    };

    const handleMatch = () => {
        navigate('/match');
    };

    const currentPlant = plantsResp[currentPlantIndex];

    return (
        <Container
            style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                margin: 0,
                marginLeft: '200px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center', // Align content horizontally to the center
                alignItems: 'center', // Align content vertically to the center
                minHeight: '100vh', // Ensure the Container takes the full height of the viewport
            }}
        >
            <Box display="flex" flexDirection="row">
                <Box flex={1} display="flex" flexDirection="column" alignItems="center">
                    <img src={flowerImage} alt={currentPlant.name} style={{ width: '100%', maxWidth: '300px' }} />
                    <Box display="flex" justifyContent="space-between" width="100%" marginTop={2}>
                        <Button onClick={handleNextPlant}>
                            <ArrowBackIcon />
                        </Button>
                        <Button onClick={handleMatch}>
                            <ArrowForwardIcon />
                        </Button>
                    </Box>
                </Box>
                <Box flex={2} paddingLeft={4}>
                    <Typography variant="h4">{currentPlant.name}</Typography>
                    <Typography variant="body1" marginTop={2}>{currentPlant.description}</Typography>
                    <Typography variant="h6" marginTop={4}>Care Instructions</Typography>
                    <Typography variant="body1" marginTop={1}>{currentPlant.careInstructions}</Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default PlantsSwipePage;
