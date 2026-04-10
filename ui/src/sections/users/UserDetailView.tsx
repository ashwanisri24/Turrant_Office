import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ChangeLogTable, type ChangeLogRow } from "../../components/shared/ChangeLogTable";

const TOP_TABS = ["Overview", "Contact & Address", "Role History", "Change Log"];

const ROLE_HISTORY = [
  { date: "2023-10-24", changedBy: "Admin Sarah", fromRole: "Back Office", toRole: "Admin, Back Office", reason: "Promotion" },
  { date: "2023-05-10", changedBy: "Admin Mike", fromRole: "Support", toRole: "Back Office", reason: "Team reassignment" },
  { date: "2023-01-15", changedBy: "System", fromRole: "—", toRole: "Support", reason: "Initial assignment on account creation" }
];

const CHANGE_LOG: ChangeLogRow[] = [
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

export function UserDetailView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Users {">"} Sarah Jenkins
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.25} flexWrap="wrap">
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Sarah Jenkins
                </Typography>
                <StatusBadge label="Active" />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                ID: USR-8832 • Administrator • Access: 2023-01-15 – 2025-01-15
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate("/users/USR-8832/edit")}>
                Edit
              </Button>
              <Button variant="outlined" color="error">
                Suspend
              </Button>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2.5} sx={{ overflowX: "auto", pb: 0.5 }}>
            {TOP_TABS.map((tab) => (
              <Box
                key={tab}
                component="button"
                type="button"
                onClick={() => setActiveTab(tab)}
                sx={{
                  border: 0,
                  bgcolor: "transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  pb: 1,
                  borderBottom: tab === activeTab ? "2px solid" : "2px solid transparent",
                  borderColor: tab === activeTab ? "#5d8c2f" : "transparent",
                  color: tab === activeTab ? "#3f6212" : "text.secondary",
                  fontWeight: tab === activeTab ? 700 : 500,
                  fontSize: 14
                }}
              >
                {tab}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Paper>

      {activeTab === "Overview" ? (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography variant="h6">User Overview</Typography>
            <Button variant="text" size="small" startIcon={<EditIcon />} sx={{ color: "#4d7c0f" }}>
              Edit
            </Button>
          </Stack>
          <Divider />
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">FULL NAME</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Sarah Jenkins</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">USER ID</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>USR-8832</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">EMAIL</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>s.jenkins@turrant.log</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">PHONE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>+91 98765 00001</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">ROLE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Administrator</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">STATUS</Typography>
              <Box sx={{ mt: 0.5 }}>
                <StatusBadge label="Active" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">ACCESS START DATE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2023-01-15</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">ACCESS END DATE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2025-01-15</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">LAST LOGIN</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2 mins ago</Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : null}

      {activeTab === "Contact & Address" ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Contact & Address</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth size="small" label="Secondary Phone" defaultValue="+91 98000 11122" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth size="small" label="Secondary Email" defaultValue="sarah.personal@email.com" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth size="small" label="Address Line 1" defaultValue="Flat 302, Park Avenue" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth size="small" label="Address Line 2" defaultValue="Near Central Park" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth size="small" label="City" defaultValue="Pune" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth size="small" label="State" defaultValue="Maharashtra" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth size="small" label="PIN Code" defaultValue="411001" />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Save Address</Button>
            </Stack>
          </Stack>
        </Paper>
      ) : null}

      {activeTab === "Role History" ? (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
            <Typography variant="h6">Role Assignment History</Typography>
            <Typography variant="body2" color="text.secondary">
              All role changes for this user account.
            </Typography>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Changed By</TableCell>
                <TableCell>From Role</TableCell>
                <TableCell>To Role</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROLE_HISTORY.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.changedBy}</TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>{row.fromRole}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#166534" }}>{row.toRole}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : null}

      {activeTab === "Change Log" ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Log
          </Typography>
          <ChangeLogTable rows={CHANGE_LOG} />
        </Paper>
      ) : null}
    </Stack>
  );
}
