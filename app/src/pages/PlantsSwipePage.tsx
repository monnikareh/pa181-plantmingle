import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { useAllPlants } from "../hooks/usePlants";
import { useNavigate, useParams } from "react-router-dom";
import flowerImage from "../assets/flower.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileSwiper from "../components/MobileSwiper";
import { storage } from "../firestore";
import { getDownloadURL, ref } from "firebase/storage";

const PlantsSwipePage: React.FC = () => {
  const { data: plantsResp, isFetching } = useAllPlants();
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchImageUrl = async (path: string) => {
      try {
        const storageRef = ref(storage, path);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
      } catch (error) {
        console.error("Error fetching image URL:", error);
        setImageUrl(null);
      }
    };

    if (plantsResp && plantsResp[currentPlantIndex]) {
      const currentPlant = plantsResp[currentPlantIndex];
      if (currentPlant.photoUrl) {
        fetchImageUrl(currentPlant.photoUrl);
      } else {
        setImageUrl(null);
      }
    }
  }, [plantsResp, currentPlantIndex]);

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

  const handleMatch = (id: number) => {
    navigate(`/match/${id}`);
  };

  const onSwipe = ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handleMatch(currentPlant.ownerId);
      } else {
        handleNextPlant();
      }
    }
  };

  const currentPlant = plantsResp[currentPlantIndex];

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <MobileSwiper onSwipe={onSwipe}>
        <Box
          display="grid"
          gridTemplateColumns={isSmUp ? "1fr 2fr" : "1fr"}
          gap={4}
          alignItems="center"
        >
          <Box textAlign="center">
            <img
              src={imageUrl || flowerImage}
              alt={currentPlant.name}
              style={{
                width: "100%",
                maxWidth: "500px",
                objectFit: "contain",
                maxHeight: isSmUp ? "" : "250px",
              }}
            />
          </Box>
          <Box>
            <Typography variant={isTouchDevice? 'h6' : 'h4'}>{currentPlant.name}</Typography>
            <Typography variant={isTouchDevice? 'body2' : 'body1'} marginTop={2}>
              {currentPlant.description}
            </Typography>
            <Typography variant="h6" marginTop={4}>
              Care Instructions
            </Typography>
            <Typography variant={isTouchDevice? 'body2' : 'body1'} marginTop={1}>
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
            paddingBottom: "50px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleMatch(currentPlant.ownerId)}
          >
            LOVE IT
            <FavoriteIcon />
            <FavoriteBorder />
          </Button>
          <Button variant="contained" color="primary" onClick={handleNextPlant}>
            NEXT
            <ArrowForwardIcon />
            <ArrowForwardIos />
            <ArrowCircleRight />
          </Button>
        </Box>
      )}
      {isTouchDevice ? null : (
        <>
          <div
            onClick={() => handleMatch(currentPlant.ownerId)}
            style={{
              position: "absolute",
              left: "-24px",
              right: "50%",
              top: "-24px",
              bottom: 0,
              display: "flex",
              alignItems: "center",
              background: "transparent",
            }}
          >
            <ArrowBackIos />
          </div>

          <div
            onClick={handleNextPlant}
            style={{
              position: "absolute",
              right: "-24px",
              left: "50%",
              top: "-24px",
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              background: "transparent",
            }}
          >
            <ArrowForwardIos />
          </div>
        </>
      )}
    </div>
  );
};

export default PlantsSwipePage;
