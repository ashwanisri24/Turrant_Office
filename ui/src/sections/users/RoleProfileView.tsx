import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useNavigate } from "react-router-dom";
import {
  ParentRoleField,
  RoleDescriptionField,
  RoleNameField
} from "../../components/forms/user-fields";

const PREVIEW = [
  { module: "Fleet Owners", read: true, write: false, update: false, delete: false, approve: false },
  { module: "Rides & Bookings", read: true, write: true, update: true, delete: false, approve: false },
  { module: "Payouts", read: true, write: false, update: false, delete: false, approve: false },
  { module: "User Management", read: false, write: false, update: false, delete: false, approve: false }
];

export function RoleProfileView() {
  const navigate = useNavigate();

  const renderPermission = (allowed: boolean) =>
    allowed ? (
      <CheckCircleRoundedIcon sx={{ color: "#2e7d32", fontSize: 18 }} />
    ) : (
      <RemoveRoundedIcon sx={{ color: "#9ca3af", fontSize: 18 }} />
    );

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Role Configuration</Typography>
          <Typography variant="body2" color="text.secondary">
            Define role metadata and preview its permission scope.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" onClick={() => navigate("/configurations/roles-permissions")}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />}>
            Save Role
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Basic Information</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <RoleNameField />
            <ParentRoleField />
          </Stack>
          <RoleDescriptionField />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">Permissions Preview</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Detailed configuration is available in the full matrix view.
        </Typography>

        <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 2 }}>
          <Stack
            direction="row"
            sx={{
              px: 2,
              py: 1.25,
              bgcolor: "#f7f8f6",
              borderBottom: "1px solid rgba(15, 23, 42, 0.08)"
            }}
          >
            <Box sx={{ width: "42%" }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary">
                Module
              </Typography>
            </Box>
            <Stack direction="row" sx={{ width: "58%" }} justifyContent="space-between">
              {["Read", "Write", "Update", "Delete", "Approve"].map((col) => (
                <Typography key={col} variant="caption" fontWeight={700} color="text.secondary">
                  {col}
                </Typography>
              ))}
            </Stack>
          </Stack>

          {PREVIEW.map((row) => (
            <Stack
              key={row.module}
              direction="row"
              alignItems="center"
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
                "&:last-of-type": { borderBottom: "none" }
              }}
            >
              <Box sx={{ width: "42%" }}>
                <Typography fontWeight={600}>{row.module}</Typography>
              </Box>
              <Stack direction="row" sx={{ width: "58%" }} justifyContent="space-between">
                <Box>{renderPermission(row.read)}</Box>
                <Box>{renderPermission(row.write)}</Box>
                <Box>{renderPermission(row.update)}</Box>
                <Box>{renderPermission(row.delete)}</Box>
                <Box>{renderPermission(row.approve)}</Box>
              </Stack>
            </Stack>
          ))}
        </Paper>
      </Paper>
    </Stack>
  );
}
