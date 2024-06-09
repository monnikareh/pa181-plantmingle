import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const FrontPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>PlantMingle</h1>
            <p style={{ marginBottom: '20px' }}>
                PlantMingle brings a Tinder-style experience to gardening enthusiasts in Brno, allowing them to 'swipe right' on plants they love. Users can list the types of plants they offer or seek, complete with care instructions and photos. When two users 'match' on a plant they're interested in swapping, they can coordinate an exchange locally. PlantMingle notifies both parties of a successful match and facilitates the swap, encouraging users to share their experiences and enrich community green spaces one plant at a time.
            </p>
            <p style={{ marginBottom: '20px' }}>
                Scenario: A city dweller looking to diversify her balcony garden with native plants spots a rare succulent on PlantMingle, offered by another local enthusiast. She offers her own collection of herb cuttings in exchange. They match on the app and arrange a swap at a nearby community garden, each leaving with new additions to their green spaces, enriching both their collections and the local biodiversity.
            </p>
            <p style={{ marginBottom: '20px' }}>
                Value: PlantMingle stands out as an eco-friendly application, as it encourages the circulation and appreciation of plants without the need for commercial transactions, aligning users with eco-conscious behaviours and promoting a greener, more sustainable world one plant at a time.
            </p>
            <Button variant="contained" color="primary" component={Link} to="/plants" style={{ marginRight: '10px' }}>
                List All Plants
            </Button>
            <Button variant="contained" color="primary" component={Link} to="/swipe">
                Swipe Plants
            </Button>
        </div>
    );
};

export default FrontPage;
