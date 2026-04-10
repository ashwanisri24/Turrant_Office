import {
  Box,
  Button,
  Chip,
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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ChangeLogTable, type ChangeLogRow } from "../../components/shared/ChangeLogTable";

const TOP_TABS = ["Overview", "Documents & Verification", "Address & Contact", "Owners", "History"];

const DRIVER_DOCUMENTS = [
  { name: "Aadhaar Card", number: "XXXX-XXXX-9012", status: "Verified", expiry: "—", updated: "Oct 10, 2023" },
  { name: "Driving License (DL)", number: "DL-12345678", status: "Review", expiry: "2026-12-31", updated: "Oct 24, 2023" },
  { name: "Medical Certificate", number: "MED-2023-8821", status: "Pending", expiry: "2024-10-15", updated: "Nov 01, 2023" },
  { name: "Police Clearance Certificate", number: "PCC-DL-2023-44201", status: "Verified", expiry: "2025-01-31", updated: "Sep 28, 2023" },
  { name: "Photo ID", number: "VOTER-DL-2020-99887", status: "Verified", expiry: "—", updated: "Oct 10, 2023" }
];

const OWNER_ASSIGNMENTS = [
  {
    owner: "Speedy Delivery Inc.",
    vehicle: "TR-2023-X99",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    status: "Active"
  },
  {
    owner: "Logistics Prime LLC",
    vehicle: "TR-2019-H10",
    startDate: "2022-03-01",
    endDate: "2023-01-14",
    status: "Ended"
  }
];

const DRIVER_CHANGE_LOG: ChangeLogRow[] = [
  {
    timestamp: "2023-10-24 14:20:55",
    admin: "Admin Sarah",
    action: "Status Changed",
    field: "Verification Status",
    oldValue: "Pending",
    newValue: "Review",
    ipDevice: "192.168.1.45 / Chrome (Mac)"
  },
  {
    timestamp: "2023-10-20 11:30:04",
    admin: "Admin Mike",
    action: "Field Updated",
    field: "Assigned Owner",
    oldValue: "Logistics Prime LLC",
    newValue: "Speedy Delivery Inc.",
    ipDevice: "10.0.0.12 / Firefox (Win)"
  },
  {
    timestamp: "2023-10-01 09:00:00",
    admin: "System",
    action: "Document Uploaded",
    field: "Aadhaar Card",
    oldValue: "—",
    newValue: "aadhaar_scan.pdf",
    ipDevice: "10.0.0.1 / System"
  },
  {
    timestamp: "2023-01-15 08:00:00",
    admin: "System",
    action: "Account Created",
    field: "Driver Account",
    oldValue: "—",
    newValue: "Driver Registered",
    ipDevice: "10.0.0.1 / System"
  }
];

export function DriverDetailView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Drivers {">"} Sarah Chen
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.25} flexWrap="wrap">
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Sarah Chen
                </Typography>
                <StatusBadge label="Online" />
                <StatusBadge label="Pending" />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                ID: DRV-8921 • License: DL-12345678 • Car license
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate("/drivers/DRV-8921/edit")}>
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
            <Typography variant="h6">Driver Overview</Typography>
            <Button variant="text" size="small" startIcon={<EditIcon />} sx={{ color: "#4d7c0f" }}>
              Edit
            </Button>
          </Stack>
          <Divider />
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} md={2}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "#f3f4f6",
                  display: "grid",
                  placeItems: "center",
                  border: "2px solid #e2e8f0"
                }}
              >
                <Typography color="text.secondary" fontSize={24}>SC</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">FULL NAME</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Sarah Chen</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">DRIVER ID</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>DRV-8921</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">PHONE</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>+1 (555) 987-6543</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">LICENSE NUMBER</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>DL-12345678</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">LICENSE TYPE</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip label="Car" size="small" sx={{ bgcolor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", fontWeight: 600, fontSize: 11 }} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">LICENSE EXPIRY</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2026-12-31</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">VERIFICATION STATUS</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <StatusBadge label="Pending" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">ENGAGEMENT STATUS</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <StatusBadge label="Available" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">AADHAAR</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>XXXX-XXXX-9012</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">ENGAGEMENT START</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2023-01-15</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">ENGAGEMENT END</Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2025-01-15</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ) : null}

      {activeTab === "Documents & Verification" ? (
        <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
          <Paper variant="outlined" sx={{ flex: 1, overflow: "hidden" }}>
            <Box sx={{ p: 2, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
              <Typography variant="h6">Documents & Verification</Typography>
              <Typography variant="body2" color="text.secondary">
                All identity and compliance documents for this driver.
              </Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Reference / Number</TableCell>
                  <TableCell>Expiry</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DRIVER_DOCUMENTS.map((doc) => (
                  <TableRow key={doc.name} hover>
                    <TableCell>
                      <Typography fontWeight={600} fontSize={13}>{doc.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{doc.number}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{doc.expiry}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{doc.updated}</TableCell>
                    <TableCell align="center">
                      <StatusBadge label={doc.status} />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Button size="small" startIcon={<VisibilityIcon />} variant="text">
                          View
                        </Button>
                        <Button size="small" startIcon={<UploadFileIcon />} variant="outlined">
                          Upload
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Paper variant="outlined" sx={{ width: { xs: "100%", xl: 340 }, p: 2.5 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Verification Controls
            </Typography>
            <Paper
              variant="outlined"
              sx={{ mt: 2, height: 200, display: "grid", placeItems: "center", bgcolor: "#f8fafc" }}
            >
              <Typography color="text.secondary" variant="body2">
                Document Preview
              </Typography>
            </Paper>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <TextField size="small" label="Document Number" defaultValue="D548291002" />
              <TextField
                size="small"
                type="date"
                label="Expiration Date"
                InputLabelProps={{ shrink: true }}
                defaultValue="2026-12-31"
              />
              <TextField size="small" label="Class / Category" defaultValue="LMV" />
              <TextField size="small" label="Internal Notes" multiline minRows={3} placeholder="Review notes..." />
              <Button variant="contained" color="success">
                Approve
              </Button>
              <Button variant="outlined" color="warning">
                Needs Info
              </Button>
              <Button variant="outlined" color="error">
                Reject
              </Button>
            </Stack>
          </Paper>
        </Stack>
      ) : null}

      {activeTab === "Address & Contact" ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Address & Contact</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth size="small" label="Address Line 1" defaultValue="12, Shivaji Nagar" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth size="small" label="Address Line 2" defaultValue="Near Railway Station" />
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

            <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 1 }}>
              Emergency Contact
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth size="small" label="Emergency Contact Name" defaultValue="Ramesh Chen" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth size="small" label="Relationship" defaultValue="Father" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth size="small" label="Emergency Phone" defaultValue="+91 98001 11234" />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Save</Button>
            </Stack>
          </Stack>
        </Paper>
      ) : null}

      {activeTab === "Owners" ? (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
            <Typography variant="h6">Owner Assignments</Typography>
            <Typography variant="body2" color="text.secondary">
              All fleet owner assignments for this driver, including historical.
            </Typography>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fleet Owner</TableCell>
                <TableCell>Vehicle Assigned</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {OWNER_ASSIGNMENTS.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{row.owner}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="text">
                      {row.vehicle}
                    </Button>
                  </TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>
                    <StatusBadge label={row.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : null}

      {activeTab === "History" ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Change History
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Full audit log for this driver record.
          </Typography>
          <ChangeLogTable rows={DRIVER_CHANGE_LOG} />
        </Paper>
      ) : null}
    </Stack>
  );
}
