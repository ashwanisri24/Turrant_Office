import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#80ec13",
      dark: "#72d611",
      contrastText: "#141811"
    },
    secondary: {
      main: "#556b2f",
      dark: "#3d4d22",
      contrastText: "#ffffff"
    },
    text: {
      primary: "#141811",
      secondary: "#758961"
    },
    background: {
      default: "#f7f8fb",
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small"
      }
    },
    MuiFormControl: {
      defaultProps: {
        size: "small"
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14
        },
        input: {
          paddingTop: 10,
          paddingBottom: 10
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 10
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          minHeight: 36,
          paddingTop: 6,
          paddingBottom: 6
        },
        containedPrimary: {
          backgroundColor: "#80ec13",
          color: "#161b0d",
          "&:hover": {
            backgroundColor: "#72d611"
          }
        },
        outlined: {
          borderColor: "#d9e1ce",
          color: "#141811",
          "&:hover": {
            borderColor: "#b8c6a4",
            backgroundColor: "#f7f8f6"
          }
        },
        text: {
          color: "#556b2f",
          "&:hover": {
            backgroundColor: "rgba(85, 107, 47, 0.08)"
          }
        }
      }
    }
  }
});

export default theme;
