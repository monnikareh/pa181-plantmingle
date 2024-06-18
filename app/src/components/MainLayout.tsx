import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTheme } from '@mui/material/styles';
import { Container, useMediaQuery } from '@mui/material';

const MainLayout: React.FC = () => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <Navbar />
            <div style={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                height: isSmUp ? 'calc(100vh - 64px)' : 'calc(100vh - 56px)',
                paddingTop: '24px',
                overflow: 'auto'
            }}>
                <Container style={{ height: '100%'}}>
                    <Outlet />
                </Container>
            </div>
        </>
    );
};

export default MainLayout;
