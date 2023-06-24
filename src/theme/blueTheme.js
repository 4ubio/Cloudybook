import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#213555'
        },
        secondary: {
            main: '#4F709C'
        }, 
        error: {
            main: red.A400
        }
    }
})