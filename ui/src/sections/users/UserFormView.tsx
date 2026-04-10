import {
  Box,
  Button,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import {
  ActiveStatusField,
  EmailField,
  FullNameField,
  PhoneField,
  RoleAssignmentField
} from "../../components/forms/user-fields";
import { DateRangeFields } from "../../components/shared/DateRangeFields";
import { ChangeLogTable, type ChangeLogRow } from "../../components/shared/ChangeLogTable";

type UserFormViewProps = {
  mode: "create" | "edit";
};

const ROLE_ASSIGNMENT_LOGS: ChangeLogRow[] = [
  {
    timestamp: "2023-10-24 14:20:55",
    admin: "Admin Sarah",
    action: "Role Updated",
    field: "Assigned Roles",
    oldValue: "Back Office",
    newValue: "Admin, Back Office",
    ipDevice: "192.168.1.45 / Chrome (Mac)"
  },
  {
    timestamp: "2023-10-20 11:30:04",
    admin: "Admin Mike",
    action: "Status Changed",
    field: "Account Status",
    oldValue: "PENDING",
    newValue: "ACTIVE",
    ipDevice: "10.0.0.12 / Firefox (Win)"
  },
  {
    timestamp: "2023-09-14 09:12:40",
    admin: "Admin Sarah",
    action: "Field Updated",
    field: "Email",
    oldValue: "sara.j@turrant.log",
    newValue: "s.jenkins@turrant.log",
    ipDevice: "192.168.1.45 / Chrome (Mac)"
  },
  {
    timestamp: "2023-08-01 08:00:00",
    admin: "System",
    action: "Account Created",
    field: "Account",
    oldValue: "—",
    newValue: "User Created",
    ipDevice: "10.0.0.1 / System"
  }
];

export function UserFormView({ mode }: UserFormViewProps) {
  const navigate = useNavigate();
  const isCreate = mode === "create";

  return (
    <Stack spacing={2}>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: "flex-start" }}
        onClick={() => navigate("/users")}
      >
        Back to Users
      </Button>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5">{isCreate ? "Create Portal User" : "Edit Portal User"}</Typography>
            <Typography variant="body2" color="text.secondary">
              {isCreate
                ? "Create a new portal user account."
                : "Update user details, role assignment, and account status."}
            </Typography>
          </Box>

          <FullNameField />
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <EmailField />
            <PhoneField />
          </Stack>
          <RoleAssignmentField />
          <ActiveStatusField />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Access Period
            </Typography>
            <DateRangeFields startLabel="Access Start Date" endLabel="Access End Date" />
          </Box>

          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate("/users")}>
              Cancel
            </Button>
            <Button variant="outlined">Save Draft</Button>
            <Button variant="contained" startIcon={<SendIcon />}>
              {isCreate ? "Save & Invite" : "Save Changes"}
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {!isCreate ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Log
          </Typography>
          <ChangeLogTable rows={ROLE_ASSIGNMENT_LOGS} />
        </Paper>
      ) : null}
    </Stack>
  );
}
