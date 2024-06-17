import {Box, CircularProgress, Typography} from '@mui/material';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAllUsers} from "../hooks/useUser";
const MatchPage = () => {
    const { data: usersResp, isFetching } = useAllUsers();
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const id = +params.id;
            const user = usersResp?.find((user) => user.id === id);
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        }
    }, [usersResp, params]);

    if (isFetching || ! usersResp) {
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

    return (
        <Box style={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                It's a match!
            </Typography>
            <Typography variant="body1">
                You can now contact each other.
            </Typography>
            {userEmail ? (
                <Typography variant="h5">Owner's Email: {userEmail}</Typography>
            ) : (
                <Typography variant="h5">Owner's email not found</Typography>
            )}
        </Box>
    );
};

export default MatchPage;
