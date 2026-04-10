import { InputAdornment, MenuItem, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

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
  options: { value: string; label: string }[];
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

export function DriverFullNameField() {
  return (
    <TextField
      label="Full Name"
      placeholder="e.g. Johnathan Doe"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonOutlineOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function DriverPhoneField() {
  return (
    <TextField
      label="Phone Number"
      placeholder="+1 (555) 000-0000"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CallOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function DriverEmailField() {
  return (
    <TextField
      label="Email Address"
      type="email"
      placeholder="john.doe@turrant.com"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function DriverLicenseNumberField() {
  return (
    <TextField
      label="License Number"
      placeholder="DL-123456789"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BadgeOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function DriverLicenseExpiryField() {
  return (
    <TextField
      label="License Expiry"
      type="date"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CalendarMonthOutlinedIcon sx={FIELD_ICON_SX} />
          </InputAdornment>
        )
      }}
    />
  );
}

export function DriverOwnerAssignmentField() {
  return (
    <SelectField
      label="Owner Assignment"
      icon={<AssignmentIndOutlinedIcon sx={FIELD_ICON_SX} />}
      placeholder="Select Fleet Owner..."
      options={[
        { value: "alpha", label: "Alpha Logistics (ID: #8832)" },
        { value: "beta", label: "Beta Transports (ID: #9921)" },
        { value: "gamma", label: "Gamma Freight (ID: #1002)" }
      ]}
    />
  );
}

export function DriverActiveStatusField() {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography fontWeight={600}>Active Status</Typography>
          <Typography variant="caption" color="text.secondary">
            Driver can accept jobs
          </Typography>
        </Stack>
        <Switch defaultChecked />
      </Stack>
    </Paper>
  );
}

export function DriverOtpStatusField() {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography fontWeight={600}>OTP Authentication</Typography>
          <Typography variant="caption" color="text.secondary">
            Require OTP for login
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <SecurityOutlinedIcon sx={FIELD_ICON_SX} />
          <Switch />
        </Stack>
      </Stack>
    </Paper>
  );
}
