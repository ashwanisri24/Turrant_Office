import { AppBar, Avatar, Button, Stack, Toolbar, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export const HEADER_HEIGHT = 64;

export function HeaderBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "text.primary",
        borderBottom: "1px solid rgba(15, 23, 42, 0.08)"
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          gap: 3,
          minHeight: HEADER_HEIGHT,
          px: { xs: 2, sm: 3 }
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Typography variant="h6" fontWeight={700} letterSpacing={0.5}>
            Turrant
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            size="small"
            sx={{ borderColor: "#e2e8f0", color: "#0f172a" }}
          >
            Configure
          </Button>
          <Button variant="contained" size="small">
            + New Project
          </Button>
          <Avatar sx={{ bgcolor: "#0ea5e9", width: 36, height: 36 }}>
            B
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
