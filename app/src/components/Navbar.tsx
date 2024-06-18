import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{
              textDecoration: "none",
              color: "#355e3b",
              fontFamily: "Jost",
            }}
          >
            PlantMingle
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
