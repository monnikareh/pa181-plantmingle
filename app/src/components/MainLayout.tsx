import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout: React.FC = () => {
    return (
        <>
            <Navbar />
            <div style={{ marginTop: '64px', padding: '16px' }}>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
