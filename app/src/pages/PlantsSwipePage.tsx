import React, {useState} from 'react';
import {Box, Button, CircularProgress, Container, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useAllPlants} from '../hooks/usePlants';
import {useNavigate} from 'react-router-dom';
import flowerImage from '../assets/flower.png';


const PlantsSwipePage: React.FC = () => {
    const {data: plantsResp, isFetching} = useAllPlants();
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
                <CircularProgress/>
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
        <div style={{
            width: '80vw',
            minHeight: '100vh',
            marginTop: '200px'
            }}
             >
            <Container
                style={{

                }}
            >
                <Box display="grid"
                     gridTemplateColumns="1fr 2fr"
                     gap={4}
                     alignItems="center"
                     marginBottom={2}
                >
                    <Box>
                        <img src={flowerImage} alt={currentPlant.name} style={{width: '100%', maxWidth: '300px'}}/>
                    </Box>
                    <Box>
                        <Typography variant="h4">{currentPlant.name}</Typography>
                        <Typography variant="body1" marginTop={2}>{currentPlant.description}</Typography>
                        <Typography variant="h6" marginTop={4}>Care Instructions</Typography>
                        <Typography variant="body1" marginTop={1}>{currentPlant.careInstructions}</Typography>
                    </Box>
                </Box>
            </Container>
            <Box style={{
                position: 'fixed',
                bottom: 20,
                width: '80%',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Button variant="contained" color="primary" onClick={handleNextPlant}>
                    <ArrowBackIcon/>
                </Button>
                <Button variant="contained" color="primary" onClick={handleMatch}>
                    <ArrowForwardIcon/>
                </Button>
            </Box>
        </div>
    );
};

export default PlantsSwipePage;
