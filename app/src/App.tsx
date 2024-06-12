import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import {CssBaseline} from "@mui/material";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#4CAF50'
            },
            secondary: {
                main: '#8D6E63',
            },
            background: {
                default: '#FFFFFF',
                paper: '#F5F5F5',
            },
            text: {
                primary: '#000000',
                secondary: '#FFFFFF',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            color: '#ffffff'
                        },
                    },
                },
            },
        },
        typography: {
            fontFamily: '"Jost", sans-serif',
            h4: {
                color: '#355e3b',
            },
            h6: {
                color: '#355e3b',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
