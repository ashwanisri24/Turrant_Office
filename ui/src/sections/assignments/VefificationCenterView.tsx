import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Drawer,
  IconButton,
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
import CloseIcon from "@mui/icons-material/Close";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useState } from "react";

type VerificationEntity = {
  id: string;
  type: string;
  owner: string;
  submitted: string;
  status: "Pending Review" | "Needs Info" | "Escalated";
  contact: string;
  phone: string;
  email: string;
  location: string;
};

const TOP_TABS = ["Assignment Board", "Assignment History", "Vefification Center"];

const KPI_CARDS = [
  { label: "Pending Owners", value: "24", delta: "+5%" },
  { label: "Pending Vehicles", value: "86", delta: "-2%" },
  { label: "Pending Drivers", value: "142", delta: "+12%" },
  { label: "Needs Info", value: "52", delta: "steady" },
  { label: "Avg. Verification", value: "4.2h", delta: "-15%" }
];

const ENTITIES: VerificationEntity[] = [
  {
    id: "MH-01-AX-9921",
    type: "Vehicle",
    owner: "QuickLogix Co.",
    submitted: "Oct 12, 09:40 AM",
    status: "Pending Review",
    contact: "Robert Downey Jnr",
    phone: "+91 98765 43210",
    email: "r.downey@example.com",
    location: "Mumbai, MH"
  },
  {
    id: "TRN-2104",
    type: "Driver",
    owner: "Individual",
    submitted: "Oct 11, 04:30 PM",
    status: "Needs Info",
    contact: "Sarah Jenkins",
    phone: "+91 97700 11004",
    email: "s.jenkins@example.com",
    location: "Delhi, DL"
  },
  {
    id: "ABCD1234F",
    type: "Fleet Owner",
    owner: "Self",
    submitted: "Oct 11, 11:20 AM",
    status: "Escalated",
    contact: "Green Logistics LLP",
    phone: "+91 90000 22291",
    email: "ops@greenlogistics.com",
    location: "Pune, MH"
  }
];

const historyItems = [
  { title: "Submission Received", note: "Oct 12, 09:40 AM • System", color: "#65a30d" },
  { title: "Background Check Initiated", note: "Oct 12, 09:45 AM • Checkpoint API", color: "#94a3b8" },
  { title: "Assigned to Alex Chen", note: "Oct 12, 10:15 AM • Auto-route", color: "#3b82f6" }
];

export function VefificationCenterView() {
  const [selectedEntity, setSelectedEntity] = useState<VerificationEntity | null>(null);

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", lg: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", lg: "center" }} spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography variant="h4">Verification Center</Typography>
          <Chip label="304 items pending" size="small" />
          <IconButton size="small">
            <RefreshRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<DownloadRoundedIcon />}>
            Export
          </Button>
          <Button variant="contained" color="success" startIcon={<FolderOpenOutlinedIcon />}>
            Bulk Action
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 0.5 }}>
        {TOP_TABS.map((tab) => (
          <Box
            key={tab}
            component="button"
            type="button"
            sx={{
              border: 0,
              bgcolor: "transparent",
              cursor: tab === "Vefification Center" ? "default" : "pointer",
              whiteSpace: "nowrap",
              pb: 1,
              borderBottom: tab === "Vefification Center" ? "2px solid #84cc16" : "2px solid transparent",
              color: tab === "Vefification Center" ? "#3f6212" : "text.secondary",
              fontWeight: tab === "Vefification Center" ? 700 : 500,
              fontSize: 14
            }}
          >
            {tab}
          </Box>
        ))}
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.25}>
        {KPI_CARDS.map((card) => (
          <Paper key={card.label} variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {card.label}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="h4" sx={{ fontSize: 38, fontWeight: 700 }}>
                {card.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: card.delta.startsWith("+") ? "#16a34a" : card.delta.startsWith("-") ? "#ef4444" : "text.disabled"
                }}
              >
                {card.delta}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <Paper variant="outlined" sx={{ p: 2, width: { lg: 280 } }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Filters
          </Typography>
          <Stack spacing={1.5}>
            <TextField size="small" label="Global Search" placeholder="Name, ID, Company..." />
            <TextField select size="small" label="Entity Type" defaultValue="all">
              <Box component="option" value="all">All Entities</Box>
              <Box component="option" value="owner">Fleet Owner</Box>
              <Box component="option" value="vehicle">Vehicle</Box>
              <Box component="option" value="driver">Driver</Box>
            </TextField>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                Status
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Checkbox size="small" defaultChecked />
                <Typography variant="body2">Pending Review</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Checkbox size="small" />
                <Typography variant="body2">Needs Info</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Checkbox size="small" />
                <Typography variant="body2">Escalated</Typography>
              </Stack>
            </Stack>
            <TextField size="small" label="Region" placeholder="All Regions" />
            <Paper variant="outlined" sx={{ p: 1, bgcolor: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.2)" }}>
              <Typography variant="body2" sx={{ color: "#dc2626", fontWeight: 700 }}>
                SLA Breach Only
              </Typography>
            </Paper>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, overflow: "hidden" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Entity</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Owner/Co.</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ENTITIES.map((row) => (
                <TableRow key={row.id} hover onClick={() => setSelectedEntity(row)} sx={{ cursor: "pointer" }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 700 }}>{row.id}</Typography>
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.submitted}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      color={row.status === "Escalated" ? "error" : row.status === "Needs Info" ? "warning" : "success"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.25, borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}>
            <Typography variant="body2" color="text.secondary">
              Showing 1-3 of 304 results
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="contained" color="success">1</Button>
              <Button size="small">2</Button>
              <Button size="small">3</Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Drawer
        anchor="right"
        open={Boolean(selectedEntity)}
        onClose={() => setSelectedEntity(null)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: { xs: "100%", sm: 420 }, p: 2 } }}
      >
        <Stack spacing={2} sx={{ height: "100%" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">Driver Verification</Typography>
              <Typography variant="body2" color="text.secondary">
                Ref: VR-D-2023-9921
              </Typography>
            </Box>
            <IconButton onClick={() => setSelectedEntity(null)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button size="small" variant="contained" color="success">Approve</Button>
            <Button size="small" variant="contained" color="error">Reject</Button>
          </Stack>

          <Paper variant="outlined" sx={{ p: 1.5 }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar sx={{ width: 46, height: 46 }}>{selectedEntity?.contact?.[0] ?? "R"}</Avatar>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>{selectedEntity?.contact ?? "Robert Downey Jnr"}</Typography>
                <Typography variant="body2" color="text.secondary">{selectedEntity?.phone ?? "+91 98765 43210"}</Typography>
                <Typography variant="body2" color="text.secondary">{selectedEntity?.email ?? "r.downey@example.com"}</Typography>
                <Typography variant="body2" color="text.secondary">{selectedEntity?.location ?? "Mumbai, MH"}</Typography>
              </Box>
            </Stack>
          </Paper>

          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Documents (4)</Typography>
              <Button size="small">View All</Button>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Paper variant="outlined" sx={{ p: 1, flex: 1 }}><Typography variant="caption">Driving License</Typography></Paper>
              <Paper variant="outlined" sx={{ p: 1, flex: 1 }}><Typography variant="caption">Aadhar Card</Typography></Paper>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Verification Checklist</Typography>
            <Stack spacing={0.75}>
              <Paper variant="outlined" sx={{ p: 1, display: "flex", alignItems: "center", gap: 0.5 }}><Checkbox size="small" checked /><Typography variant="body2">Background Check Passed</Typography></Paper>
              <Paper variant="outlined" sx={{ p: 1, display: "flex", alignItems: "center", gap: 0.5 }}><Checkbox size="small" checked /><Typography variant="body2">License Expiry Valid (&gt; 6 months)</Typography></Paper>
              <Paper variant="outlined" sx={{ p: 1, display: "flex", alignItems: "center", gap: 0.5 }}><Checkbox size="small" /><Typography variant="body2">Photo ID Match Verification</Typography></Paper>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Internal Comments</Typography>
            <TextField multiline minRows={3} fullWidth placeholder="Add a note or reason for rejection/info request..." />
            <Button size="small" sx={{ mt: 0.75 }}>Ask for Info</Button>
          </Box>

          <Box sx={{ mt: "auto" }}>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Verification History</Typography>
            <Stack spacing={1}>
              {historyItems.map((item) => (
                <Stack key={item.title} direction="row" spacing={1}>
                  <Box sx={{ width: 8, height: 8, mt: 0.8, borderRadius: "50%", bgcolor: item.color }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.note}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Finalize Decision
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </Stack>
  );
}
