import {
  Box,
  Button,
  LinearProgress,
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
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ElectricCarOutlinedIcon from "@mui/icons-material/ElectricCarOutlined";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { StatusBadge } from "../../components/status/status-badge";

const KPI_CARDS = [
  { label: "Total Fleet Owners", value: "128", note: "+12%", icon: <StorefrontOutlinedIcon /> },
  { label: "Pending Verifications", value: "14", note: "Review All", icon: <VerifiedUserOutlinedIcon /> },
  { label: "Active Fleets/Drivers", value: "45 / 120", note: "", icon: <ElectricCarOutlinedIcon /> },
  { label: "System Alerts", value: "24", note: "3 Critical", icon: <NotificationImportantOutlinedIcon /> }
];

const ALERTS = [
  {
    severity: "Critical",
    details: "Vehicle offline during active trip",
    entity: "VH-9021 (Toyota Innova)",
    time: "2m ago",
    action: "Track"
  },
  {
    severity: "Warning",
    details: "Driver license expiring in 3 days",
    entity: "Rohan Mehta (DR-114)",
    time: "45m ago",
    action: "Notify"
  },
  {
    severity: "Info",
    details: "New fleet owner registration",
    entity: "Skyline Travels Co.",
    time: "1h ago",
    action: "View"
  },
  {
    severity: "Warning",
    details: "Unusually long idle time (Station 4)",
    entity: "Fleet A2 - 5 Vehicles",
    time: "2h ago",
    action: "Check"
  }
];

const DISTRIBUTION = [
  { label: "SEDAN", value: 60 },
  { label: "SUV", value: 25 },
  { label: "TRUCK", value: 15 }
];

export function DashboardView() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">
            Super admin operational overview.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.25} sx={{ minWidth: 340 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search drivers, owners, or ride IDs..."
          />
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        {KPI_CARDS.map((kpi) => (
          <Paper key={kpi.label} variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ color: "text.secondary" }}>{kpi.icon}</Box>
              {kpi.note ? <Typography variant="caption" color="primary.dark" fontWeight={700}>{kpi.note}</Typography> : null}
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              {kpi.label}
            </Typography>
            <Typography variant="h4" fontSize={28} fontWeight={700}>
              {kpi.value}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
        <Stack spacing={1.5} sx={{ flex: 1.8 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Recent System Alerts</Typography>
            <Button variant="text" size="small">
              View History
            </Button>
          </Stack>

          <Paper variant="outlined" sx={{ overflow: "hidden" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Severity</TableCell>
                  <TableCell>Alert Details</TableCell>
                  <TableCell>Entity</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ALERTS.map((alert) => (
                  <TableRow key={`${alert.details}-${alert.time}`} hover>
                    <TableCell>
                      <StatusBadge label={alert.severity} />
                    </TableCell>
                    <TableCell>{alert.details}</TableCell>
                    <TableCell>{alert.entity}</TableCell>
                    <TableCell>{alert.time}</TableCell>
                    <TableCell align="right">
                      <Button variant="text" size="small">
                        {alert.action}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Stack>

        <Stack spacing={1.5} sx={{ flex: 1 }}>
          <Typography variant="h6">Quick Operations</Typography>
          <Button variant="contained" startIcon={<PersonAddOutlinedIcon />} sx={{ justifyContent: "flex-start" }}>
            Onboard New Driver
          </Button>
          <Button variant="outlined" startIcon={<EditCalendarOutlinedIcon />} sx={{ justifyContent: "flex-start" }}>
            Manual Assignment
          </Button>
          <Button variant="outlined" startIcon={<AssessmentOutlinedIcon />} sx={{ justifyContent: "flex-start" }}>
            Generate Daily Report
          </Button>

          <Typography variant="h6" sx={{ mt: 1 }}>
            Fleet Distribution
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {DISTRIBUTION.map((item) => (
                <Box key={item.label}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" fontWeight={700}>
                      {item.label}
                    </Typography>
                    <Typography variant="caption" fontWeight={700}>
                      {item.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={item.value}
                    sx={{ height: 8, borderRadius: 999, bgcolor: "#e2e8f0" }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
}
