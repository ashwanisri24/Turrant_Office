import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import MarkunreadRoundedIcon from "@mui/icons-material/MarkunreadRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";

const KPI_CARDS = [
  {
    label: "Total Open Cases",
    value: "124",
    delta: "+5%",
    icon: <MarkunreadRoundedIcon fontSize="small" />,
    tone: "#2563eb"
  },
  {
    label: "Pending Investigation",
    value: "42",
    delta: "-2%",
    icon: <HourglassBottomRoundedIcon fontSize="small" />,
    tone: "#d97706"
  },
  {
    label: "Escalated Tickets",
    value: "15",
    delta: "+10%",
    icon: <ErrorRoundedIcon fontSize="small" />,
    tone: "#dc2626"
  },
  {
    label: "Avg. Resolution Time",
    value: "3.2h",
    delta: "-15%",
    icon: <WatchLaterRoundedIcon fontSize="small" />,
    tone: "#059669"
  }
];

const CASES = [
  {
    id: "#CAS-9021",
    type: "Dispute",
    typeIcon: <GavelRoundedIcon sx={{ fontSize: 16, color: "#2563eb" }} />,
    priority: "HIGH",
    rideId: "RID-88219",
    status: "Assigned",
    statusColor: "#d97706",
    assignee: "John Doe",
    created: "Oct 10, 2:15 PM"
  },
  {
    id: "#CAS-9025",
    type: "Fraud Alert",
    typeIcon: <FlagRoundedIcon sx={{ fontSize: 16, color: "#dc2626" }} />,
    priority: "CRITICAL",
    rideId: "RID-88255",
    status: "Escalated",
    statusColor: "#dc2626",
    assignee: "Sarah Adams",
    created: "Oct 09, 10:42 AM"
  },
  {
    id: "#CAS-9028",
    type: "Lost Item",
    typeIcon: <AssignmentLateOutlinedIcon sx={{ fontSize: 16, color: "#64748b" }} />,
    priority: "LOW",
    rideId: "RID-88102",
    status: "Resolved",
    statusColor: "#059669",
    assignee: "Mike Kim",
    created: "Oct 08, 4:05 PM"
  },
  {
    id: "#CAS-9031",
    type: "Police Req.",
    typeIcon: <FlagRoundedIcon sx={{ fontSize: 16, color: "#4f46e5" }} />,
    priority: "HIGH",
    rideId: "RID-88331",
    status: "In-Progress",
    statusColor: "#4f46e5",
    assignee: "Unassigned",
    created: "Oct 11, 8:20 AM"
  }
];

const RECENT_ACTIVITY = [
  {
    title: "Case #CAS-9028 Resolved",
    note: "Mike Kim marked lost item as returned to owner.",
    time: "14 mins ago",
    color: "#65a30d"
  },
  {
    title: "Escalated: #CAS-9025",
    note: "Flagged for immediate review by risk department.",
    time: "42 mins ago",
    color: "#ef4444"
  },
  {
    title: "New Comment on #CAS-9031",
    note: "Officer requested dashcam footage from ride RID-88331.",
    time: "1 hour ago",
    color: "#3b82f6"
  },
  {
    title: "#CAS-9021 Assigned",
    note: "Assigned to John Doe for fare recalculation.",
    time: "2 hours ago",
    color: "#64748b"
  }
];

export function SupportInvestigationView() {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
        <Box>
          <Typography variant="h4">Support & Investigation</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, monitor, and resolve escalated transport cases.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.25}>
          <Button variant="contained" startIcon={<AddCircleRoundedIcon />} color="success">
            New Case
          </Button>
          <Button variant="outlined" startIcon={<DownloadRoundedIcon />}>
            Export Report
          </Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        {KPI_CARDS.map((card) => (
          <Paper key={card.label} variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 1.25,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: `${card.tone}1a`,
                  color: card.tone
                }}
              >
                {card.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 999,
                  fontWeight: 700,
                  color: card.delta.startsWith("+") ? "#16a34a" : "#ef4444",
                  bgcolor: card.delta.startsWith("+") ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"
                }}
              >
                {card.delta}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              {card.label}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.25, fontSize: 38, fontWeight: 700 }}>
              {card.value}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
        <Stack spacing={1.5} sx={{ flex: 1.9 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.25} alignItems={{ md: "center" }}>
            <Button variant="outlined" sx={{ justifyContent: "space-between", minWidth: 180 }}>
              Case Type: All Types
            </Button>
            <Button variant="outlined" sx={{ justifyContent: "space-between", minWidth: 140 }}>
              Status: All Status
            </Button>
            <Button variant="outlined" sx={{ justifyContent: "space-between", minWidth: 140 }}>
              Priority: All Priority
            </Button>
            <Button variant="text" startIcon={<AutorenewRoundedIcon />} sx={{ ml: { md: "auto" } }}>
              Reset
            </Button>
          </Stack>

          <Paper variant="outlined" sx={{ overflow: "hidden" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Case ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Ride ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assignee</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CASES.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>{row.id}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        {row.typeIcon}
                        <Typography variant="body2">{row.type}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          fontWeight: 700,
                          bgcolor: row.priority === "CRITICAL" ? "rgba(239,68,68,0.15)" : row.priority === "HIGH" ? "rgba(245,158,11,0.16)" : "rgba(148,163,184,0.2)",
                          color: row.priority === "CRITICAL" ? "#dc2626" : row.priority === "HIGH" ? "#b45309" : "#475569"
                        }}
                      >
                        {row.priority}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{row.rideId}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: row.statusColor }} />
                        <Typography sx={{ color: row.statusColor, fontWeight: 700 }}>{row.status}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ color: row.assignee === "Unassigned" ? "text.disabled" : "text.primary", fontStyle: row.assignee === "Unassigned" ? "italic" : "normal" }}>
                      {row.assignee}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{row.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.25, borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}>
              <Typography variant="body2" color="text.secondary">
                Showing 1 to 4 of 124 cases
              </Typography>
              <Stack direction="row" spacing={0.75}>
                <Button size="small" variant="outlined">
                  Previous
                </Button>
                <Button size="small" variant="contained">
                  Next
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        <Paper variant="outlined" sx={{ p: 2, minWidth: { xl: 280 }, flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ fontSize: 24, letterSpacing: 0.5 }}>
              Recent Activity
            </Typography>
            <Button size="small" variant="text" color="success">
              View All
            </Button>
          </Stack>
          <Stack spacing={2}>
            {RECENT_ACTIVITY.map((item, idx) => (
              <Stack key={`${item.title}-${idx}`} direction="row" spacing={1}>
                <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: item.color, mt: 0.7, flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, lineHeight: 1.35 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                    {item.note}
                  </Typography>
                  <Typography variant="caption" sx={{ mt: 0.4, display: "block", color: "text.disabled", textTransform: "uppercase", fontWeight: 700 }}>
                    {item.time}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
