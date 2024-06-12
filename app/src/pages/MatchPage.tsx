import { Box, Typography } from '@mui/material';

const MatchPage = () => {
    return (
        <Box style={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                It's a match!
            </Typography>
            <Typography variant="body1">
                You can now contact each other.
            </Typography>
        </Box>
    );
};

export default MatchPage;
