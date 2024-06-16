import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAllPlants } from "../hooks/usePlants";
import { useNavigate, useParams } from "react-router-dom";
import flowerImage from "../assets/flower.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileSwiper from "../components/MobileSwiper";

const PlantsSwipePage: React.FC = () => {
  const { data: plantsResp, isFetching } = useAllPlants();
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0;

  useEffect(() => {
    if (params.id) {
      const id = +params.id;
      const foundIndex = plantsResp?.findIndex((plant) => plant.id === id) || 0;
      setCurrentPlantIndex(foundIndex);
    } else {
      setCurrentPlantIndex(0);
    }
  }, [plantsResp, params]);

  if (isFetching || !plantsResp) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleNextPlant = () => {
    const nextPlant = plantsResp[(currentPlantIndex + 1) % plantsResp.length];
    navigate(`/swipe/${nextPlant.id}`);
  };

  const handleMatch = () => {
    navigate("/match");
  };

  const onSwipe = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handleNextPlant();
      } else {
        handleMatch();
      }
    }
  };

  const currentPlant = plantsResp[currentPlantIndex];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <MobileSwiper onSwipe={onSwipe}>
        <Box
          display="grid"
          gridTemplateColumns={isSmUp ? "1fr 2fr" : "1fr"}
          gap={4}
          alignItems="center"
        >
          <Box textAlign="center">
            <img
              src={flowerImage}
              alt={currentPlant.name}
              style={{
                width: "100%",
                maxWidth: "300px",
                objectFit: "contain",
                maxHeight: isSmUp ? "" : "150px",
              }}
            />
          </Box>
          <Box>
            <Typography variant="h4">{currentPlant.name}</Typography>
            <Typography variant="body1" marginTop={2}>
              {currentPlant.description}
            </Typography>
            <Typography variant="h6" marginTop={4}>
              Care Instructions
            </Typography>
            <Typography variant="body1" marginTop={1}>
              {currentPlant.careInstructions}
            </Typography>
          </Box>
        </Box>
      </MobileSwiper>

      {isTouchDevice ? null : (
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexShrink: 0,
            marginTop: "auto",
            paddingBottom: "24px",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleNextPlant}>
            <ArrowBackIcon />
          </Button>
          <Button variant="contained" color="primary" onClick={handleMatch}>
            <ArrowForwardIcon />
          </Button>
        </Box>
      )}
    </div>
  );
};

export default PlantsSwipePage;
