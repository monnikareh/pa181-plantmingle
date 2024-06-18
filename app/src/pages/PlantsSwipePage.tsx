import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAllPlants } from "../hooks/usePlants";
import { useNavigate, useParams } from "react-router-dom";
// import flowerImage from "../assets/flower.png";
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
              // src={imageUrl || flowerImage}
              src={imageUrl || undefined}
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
            <Typography variant={isTouchDevice ? "h6" : "h4"}>
              {currentPlant.name}
            </Typography>
            <Typography
              variant={isTouchDevice ? "body2" : "body1"}
              marginTop={2}
            >
              {currentPlant.description}
            </Typography>
            <Typography variant="h6" marginTop={4}>
              Care Instructions
            </Typography>
            <Typography
              variant={isTouchDevice ? "body2" : "body1"}
              marginTop={1}
            >
              {currentPlant.careInstructions}
            </Typography>
          </Box>
        </Box>
      </MobileSwiper>

      {isTouchDevice ? null : (
        <>
          <div
            onClick={() => handleMatch(currentPlant.ownerId)}
            style={{
              position: "absolute",
              left: "-24px",
              right: "70%",
              top: "-24px",
              bottom: 0,
              display: "flex",
              alignItems: "center",
              background: "transparent",
            }}
            className="swipe-button"
          >
            <ArrowBackIos
              className="arrowback"
              sx={{
                height: "40px",
                width: "40px",
                position: "absolute",
                cursor: "pointer",
                color: "green",
                transition: "opacity 1s ease-in-out",
              }}
            />
            <FavoriteIcon
              className="favorite"
              sx={{
                height: "40px",
                width: "40px",
                position: "absolute",
                cursor: "pointer",
                color: "green",
                transition: "opacity 1s ease-in-out",
              }}
            />
          </div>

          <div
            onClick={handleNextPlant}
            style={{
              position: "absolute",
              right: "-24px",
              left: "70%",
              top: "-24px",
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              background: "transparent",
            }}
            className="swipe-button"
          >
            <ArrowForwardIos
              sx={{
                height: "40px",
                width: "40px",
                cursor: "pointer",
                transition: "transform 0.3s ease, opacity 1s ease-in-out",
                color: "green",
                ":hover": { opacity: 1 },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PlantsSwipePage;
