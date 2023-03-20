import '@/styles/globals.css'
import "@/styles/markdown.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    typography: {
        fontFamily: '"Trebuchet MS", sans-serif',
    },
});

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
