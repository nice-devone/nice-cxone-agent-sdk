import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Palette matches help.nicecxone.com's own mainstyles.css (.themeBlue,
  // body/heading color, and the a:visited/:focus light-blue tint) — see
  // FAQ/styles.css for the same mapping applied to the FAQ site.
  // success/error/warning are left as-is: they carry real status meaning
  // (agent state, connection state, form errors), not brand color.
  palette: {
    primary: {
      main: "#3694FC",
      light: "#93C3FA",
      dark: "#21212b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#93C3FA",
      light: "#93C3FA",
      dark: "#3694FC",
      contrastText: "#21212b",
    },
    background: {
      default: "#f8f8f8",
      paper: "#ffffff",
    },
    success: {
      main: "#2e7d32",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ed6c02",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 24px",
        },
        containedPrimary: {
          background: "#3694FC",
          "&:hover": {
            background: "#3694FC",
            boxShadow: "0 4px 14px rgba(54, 148, 252, 0.4)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
        },
      },
    },
  },
});

export default theme;
