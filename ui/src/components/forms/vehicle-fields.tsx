import { InputAdornment, MenuItem, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

type Option = { value: string; label: string };
const FIELD_ICON_SX = { fontSize: 18 };

function SelectField({
  label,
  icon,
  placeholder,
  options
}: {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  options: Option[];
}) {
  return (
    <TextField
      select
      label={label}
      defaultValue=""
      InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export function VehicleRegistrationField() {
  return (
    <TextField
      label="Registration Number"
      placeholder="e.g. KA-01-AB-1234"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PinOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function VehicleVinField() {
  return <TextField label="VIN" placeholder="17-character VIN" />;
}

export function VehicleMakeField() {
  return (
    <SelectField
      label="Make"
      icon={<DirectionsCarOutlinedIcon sx={FIELD_ICON_SX} />}
      placeholder="Select Make"
      options={[
        { value: "toyota", label: "Toyota" },
        { value: "ford", label: "Ford" },
        { value: "honda", label: "Honda" },
        { value: "tesla", label: "Tesla" }
      ]}
    />
  );
}

export function VehicleModelField() {
  return (
    <SelectField
      label="Model"
      icon={<DirectionsCarOutlinedIcon sx={FIELD_ICON_SX} />}
      placeholder="Select Model"
      options={[
        { value: "fortuner", label: "Fortuner" },
        { value: "transit", label: "Transit" },
        { value: "civic", label: "Civic" },
        { value: "model-3", label: "Model 3" }
      ]}
    />
  );
}

export function VehicleYearField() {
  return (
    <SelectField
      label="Year"
      icon={<CalendarMonthOutlinedIcon sx={FIELD_ICON_SX} />}
      placeholder="Select Year"
      options={[
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" }
      ]}
    />
  );
}

export function VehicleColorField() {
  return (
    <TextField
      label="Color"
      placeholder="White"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ColorLensOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function SeatingCapacityField() {
  return <TextField label="Seating Capacity" type="number" placeholder="4" />;
}

export function FuelTypeField() {
  return (
    <SelectField
      label="Fuel Type"
      icon={<LocalGasStationOutlinedIcon sx={FIELD_ICON_SX} />}
      placeholder="Select Fuel Type"
      options={[
        { value: "petrol", label: "Petrol" },
        { value: "diesel", label: "Diesel" },
        { value: "electric", label: "Electric" },
        { value: "hybrid", label: "Hybrid" }
      ]}
    />
  );
}

export function FleetOwnerAssignmentField() {
  return (
    <TextField
      label="Fleet Owner Assignment"
      placeholder="Search owner by name or ID..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonSearchOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function VehicleVerificationStatusField() {
  return (
    <Paper variant="outlined" sx={{ px: 2, py: 1.25 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography fontWeight={600}>Mark as Verified</Typography>
          <Typography variant="caption" color="text.secondary">
            Is this vehicle cleared for operation?
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <VerifiedOutlinedIcon sx={FIELD_ICON_SX} />
          <Switch defaultChecked />
        </Stack>
      </Stack>
    </Paper>
  );
}

export function VehicleRentalFields() {
  return (
    <Paper variant="outlined" sx={{ px: 2, py: 1.5 }}>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography fontWeight={600}>Rental Vehicle</Typography>
            <Typography variant="caption" color="text.secondary">
              Owner has rented this vehicle from a third party
            </Typography>
          </Stack>
          <Switch />
        </Stack>
        <TextField label="Rental Agreement URL" placeholder="Link to uploaded rental agreement document" fullWidth />
        <TextField
          label="Rental Valid Until"
          type="date"
          InputLabelProps={{ shrink: true }}
          helperText="Vehicle will be flagged when rental expires"
        />
      </Stack>
    </Paper>
  );
}
