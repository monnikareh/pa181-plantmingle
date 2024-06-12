import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const FrontPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <img src="/favicon.svg" alt="PlantMingle logo" style={{width: '20%' }}/>
            <h1 style={{color: "#355e3b" } }>PlantMingle</h1>
            <p style={{ margin: 'auto' }}>
                PlantMingle brings a Tinder-style experience to gardening enthusiasts in Brno, allowing them to 'swipe right' on plants they love. Users can list the types of plants they offer or seek, complete with care instructions and photos. When two users 'match' on a plant they're interested in swapping, they can coordinate an exchange locally. PlantMingle notifies both parties of a successful match and facilitates the swap, encouraging users to share their experiences and enrich community green spaces one plant at a time.
            </p>
            <div style={{ display: 'inline-block', margin: '0 auto' }}>
                <Button variant="contained" color="primary" component={Link} to="/plants" style={{ display: 'block', margin: '20px auto' }}>
                    List All Plants
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/swipe" style={{ display: 'block', margin: '20px auto' }}>
                    Swipe Plants
                </Button>
            </div>
        </div>
    );
};

export default FrontPage;
