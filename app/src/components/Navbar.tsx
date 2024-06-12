import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: '#355e3b', fontFamily: "Jost" }}>
                    PlantMingle
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
