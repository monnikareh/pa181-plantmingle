import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTheme } from '@mui/material/styles';

const MainLayout: React.FC = () => {
    const theme = useTheme();

    return (
        <>
            <Navbar />
            <div style={{
                marginTop: '64px',
                padding: '16px',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary
            }}>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
