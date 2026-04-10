import type { ReactNode } from "react";
import {
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

type SelectOption = {
  value: string;
  label: string;
};

type IconTextFieldProps = {
  label: string;
  placeholder?: string;
  icon: ReactNode;
  type?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  minRows?: number;
};

function IconTextField({
  label,
  placeholder,
  icon,
  type = "text",
  fullWidth,
  multiline,
  minRows
}: IconTextFieldProps) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={type}
      fullWidth={fullWidth}
      multiline={multiline}
      minRows={minRows}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>
      }}
    />
  );
}

type IconSelectFieldProps = {
  label: string;
  icon: ReactNode;
  options: SelectOption[];
  placeholder: string;
  fullWidth?: boolean;
};

function IconSelectField({ label, icon, options, placeholder, fullWidth }: IconSelectFieldProps) {
  return (
    <TextField
      select
      label={label}
      defaultValue=""
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>
      }}
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

export function FullNameField() {
  return (
    <IconTextField
      label="Full Name"
      placeholder="e.g. Jane Doe"
      icon={<PersonOutlineOutlinedIcon sx={FIELD_ICON_SX} />}
    />
  );
}

export function EmailField() {
  return (
    <IconTextField
      label="Email Address"
      placeholder="jane@company.com"
      icon={<EmailOutlinedIcon sx={FIELD_ICON_SX} />}
      type="email"
      fullWidth
    />
  );
}

export function PhoneField() {
  return (
    <IconTextField
      label="Phone Number"
      placeholder="+1 (555) 000-0000"
      icon={<CallOutlinedIcon sx={FIELD_ICON_SX} />}
      type="tel"
      fullWidth
    />
  );
}

export function RoleAssignmentField() {
  return (
    <IconSelectField
      label="Role Assignment"
      icon={<BadgeOutlinedIcon sx={FIELD_ICON_SX} />}
      placeholder="Select a role..."
      options={[
        { value: "admin", label: "Administrator" },
        { value: "dispatcher", label: "Dispatcher" },
        { value: "support", label: "Support" },
        { value: "driver-manager", label: "Driver Manager" }
      ]}
    />
  );
}

export function ActiveStatusField() {
  return (
    <Paper variant="outlined" sx={{ px: 2, py: 1.25 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography fontWeight={600}>Active Status</Typography>
          <Typography variant="caption" color="text.secondary">
            User can log in immediately upon creation.
          </Typography>
        </Stack>
        <FormControlLabel control={<Switch defaultChecked />} label="" sx={{ m: 0 }} />
      </Stack>
    </Paper>
  );
}

export function RoleNameField() {
  return (
    <IconTextField
      label="Role Name"
      placeholder="e.g. Support Lead"
      icon={<BadgeOutlinedIcon sx={FIELD_ICON_SX} />}
      fullWidth
    />
  );
}

export function ParentRoleField() {
  return (
    <IconSelectField
      label="Parent Role"
      icon={<BadgeOutlinedIcon sx={FIELD_ICON_SX} />}
      placeholder="Select a parent role..."
      fullWidth
      options={[
        { value: "admin", label: "Back Office Admin" },
        { value: "fleet-manager", label: "Fleet Manager" },
        { value: "support-l1", label: "Support L1" }
      ]}
    />
  );
}

export function RoleDescriptionField() {
  return (
    <IconTextField
      label="Description"
      placeholder="Describe role responsibilities..."
      icon={<PersonOutlineOutlinedIcon sx={FIELD_ICON_SX} />}
      multiline
      minRows={4}
    />
  );
}
const FIELD_ICON_SX = { fontSize: 18 };
