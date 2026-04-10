import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";

type FleetOwnerFormViewProps = {
  mode: "create" | "edit";
};

export function FleetOwnerFormView({ mode }: FleetOwnerFormViewProps) {
  const navigate = useNavigate();
  const isCreate = mode === "create";

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h4">{isCreate ? "Create Fleet Owner" : "Edit Fleet Owner"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {isCreate
            ? "Create a fleet owner profile and assign operations metadata."
            : "Update fleet owner profile details and contact metadata."}
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <TextField label="Company Name" placeholder="e.g. GreenLine Logistics" />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField label="Contact Person" fullWidth />
            <TextField label="Phone Number" fullWidth />
          </Stack>
          <TextField label="Email Address" type="email" />
          <TextField label="City" />
          <TextField label="Address" multiline minRows={3} />

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button variant="outlined" onClick={() => navigate("/fleet-owners")}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />}>
              {isCreate ? "Create Fleet Owner" : "Save Changes"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
