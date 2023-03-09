import createTheme from "@mui/material/styles/createTheme";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#AA7D54",
      light: "#769853",
      dark: "",
    },
    secondary: {
      main: "#000000",
      light: "",
      dark: "",
    },
    text: {
      primary: "#1A2027",
      secondary: "#3E5060",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    common: {
      black: "#000000",
      // white: "#fff",
    },
    grey: {
      50: "#F3F6F9",
      100: "#E7EBF0",
      200: "#E0E3E7",
      300: "#CDD2D7",
      400: "#B2BAC2",
      500: "#A0AAB4",
      600: "#6F7E8C",
      700: "#3E5060",
      800: "#2D3843",
      900: "#1A2027",
    },
  },
  typography: {
    fontFamily: `'Poppins' !important`,
  },
});
