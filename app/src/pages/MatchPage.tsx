import { Container, Typography } from '@mui/material';

const MatchPage = () => {
    return (
        <Container style={{ paddingTop: '20px', paddingBottom: '20px', margin: 0, width: '100%', textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                It's a match!
            </Typography>
            <Typography variant="body1">
                You can now contact each other.
            </Typography>
        </Container>
    );
};

export default MatchPage;
