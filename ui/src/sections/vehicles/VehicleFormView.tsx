import { Box, Button, Divider, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FleetOwnerAssignmentField,
  FuelTypeField,
  SeatingCapacityField,
  VehicleColorField,
  VehicleMakeField,
  VehicleModelField,
  VehicleRegistrationField,
  VehicleVerificationStatusField,
  VehicleVinField,
  VehicleYearField
} from "../../components/forms/vehicle-fields";
import { DateRangeFields } from "../../components/shared/DateRangeFields";

type VehicleFormViewProps = {
  mode: "create" | "edit";
};

export function VehicleFormView({ mode }: VehicleFormViewProps) {
  const navigate = useNavigate();
  const isCreate = mode === "create";
  const [isRental, setIsRental] = useState(false);

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h4">{isCreate ? "Add New Vehicle" : "Edit Vehicle"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {isCreate
            ? "Enter vehicle details below to register a new unit."
            : "Update vehicle identity, specifications, and assignment details."}
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <Typography variant="h6">Vehicle Identity</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <VehicleRegistrationField />
            <VehicleVinField />
          </Stack>

          <Typography variant="h6" sx={{ pt: 1 }}>
            Specifications
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <VehicleMakeField />
            <VehicleModelField />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <VehicleYearField />
            <VehicleColorField />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <SeatingCapacityField />
            <FuelTypeField />
          </Stack>

          <Typography variant="h6" sx={{ pt: 1 }}>
            Operation Period
          </Typography>
          <DateRangeFields startLabel="Operation Start Date" endLabel="Operation End Date" />

          <Typography variant="h6" sx={{ pt: 1 }}>
            Administration
          </Typography>
          <FleetOwnerAssignmentField />
          <VehicleVerificationStatusField />

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <DirectionsCarIcon sx={{ color: "#64748b", fontSize: 20 }} />
                <Typography variant="h6">Rental Vehicle</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Toggle if this vehicle is registered under a rental arrangement.
              </Typography>
            </Box>
            <Switch
              checked={isRental}
              onChange={(e) => setIsRental(e.target.checked)}
              color="primary"
            />
          </Stack>

          {isRental ? (
            <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Rental Details
              </Typography>
              <Stack spacing={2}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField fullWidth size="small" label="Rental Company Name" placeholder="e.g. Zoomcar, Myles..." />
                  <TextField fullWidth size="small" label="Rental Agreement Number" placeholder="e.g. RNT-2024-XXXXX" />
                </Stack>
                <DateRangeFields startLabel="Rental Valid From" endLabel="Rental Valid Until" />
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Rental Verification Status"
                  defaultValue=""
                  SelectProps={{ native: true }}
                >
                  <option value="">Select status</option>
                  <option value="pending">Pending Verification</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </TextField>
              </Stack>
            </Paper>
          ) : null}

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button variant="outlined" onClick={() => navigate("/vehicles")}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />}>
              {isCreate ? "Save Vehicle" : "Update Vehicle"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
