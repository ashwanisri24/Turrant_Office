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
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ChangeLogTable, type ChangeLogRow } from "../../components/shared/ChangeLogTable";

const TOP_TABS = ["Overview", "Documents", "History"];

const VEHICLE_DOCUMENTS = [
  { name: "Insurance Policy", number: "INS-2024-MH12-X99", status: "Verified", expiry: "2024-11-30", updated: "Oct 01, 2023" },
  { name: "Vehicle Registration", number: "MH 12 AB 4901", status: "Verified", expiry: "2026-03-31", updated: "Oct 01, 2023" },
  { name: "Fitness Certificate", number: "FC-2023-8821", status: "Review", expiry: "2024-06-30", updated: "Nov 01, 2023" },
  { name: "Permit", number: "PRM-MH-2023-4401", status: "Pending", expiry: "2025-03-31", updated: "Oct 15, 2023" }
];

const VEHICLE_CHANGE_LOG: ChangeLogRow[] = [
  {
    timestamp: "2023-11-01 10:30:00",
    admin: "Admin Sarah",
    action: "Status Changed",
    field: "Vehicle Status",
    oldValue: "Maintenance",
    newValue: "Active",
    ipDevice: "192.168.1.45 / Chrome (Mac)"
  },
  {
    timestamp: "2023-10-22 14:05:00",
    admin: "Admin Mike",
    action: "Field Updated",
    field: "Assigned Driver",
    oldValue: "Amit Singh",
    newValue: "John Doe",
    ipDevice: "10.0.0.12 / Firefox (Win)"
  },
  {
    timestamp: "2023-10-01 09:00:00",
    admin: "System",
    action: "Document Uploaded",
    field: "Insurance Policy",
    oldValue: "—",
    newValue: "insurance_policy_2024.pdf",
    ipDevice: "10.0.0.1 / System"
  },
  {
    timestamp: "2023-09-15 08:00:00",
    admin: "System",
    action: "Account Created",
    field: "Vehicle",
    oldValue: "—",
    newValue: "Vehicle Registered",
    ipDevice: "10.0.0.1 / System"
  }
];

export function VehicleDetailView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Vehicles {">"} TR-2023-X99
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.25} flexWrap="wrap">
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Toyota Fortuner
                </Typography>
                <StatusBadge label="Active" />
                <StatusBadge label="Verified" />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                ID: TR-2023-X99 • Plate: MH 12 AB 4901 • Owner: Logistics Corp
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate("/vehicles/TR-2023-X99/edit")}>
                Edit
              </Button>
              <Button variant="outlined" color="inherit">
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
            <Typography variant="h6">Vehicle Specifications</Typography>
            <Button variant="text" size="small" startIcon={<EditIcon />} sx={{ color: "#4d7c0f" }}>
              Edit
            </Button>
          </Stack>
          <Divider />
          <Grid container spacing={3} sx={{ p: 2 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">TYPE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>SUV</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">MAKE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Toyota</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">MODEL</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Fortuner</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">YEAR</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2022</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">COLOR</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Pearl White</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">SEATING CAPACITY</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>6</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">FUEL TYPE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Diesel</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">VIN</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>JTJBARBZ2N5012341</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">ENGAGEMENT STATUS</Typography>
              <Box sx={{ mt: 0.5 }}>
                <StatusBadge label="On Trip" />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">FLEET OWNER</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>Logistics Corp</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">ASSIGNED DRIVER</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>John Doe</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">RENTAL VEHICLE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>No</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">OPERATION START DATE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2023-09-15</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">OPERATION END DATE</Typography>
              <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2026-09-15</Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : null}

      {activeTab === "Documents" ? (
        <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
          <Paper variant="outlined" sx={{ flex: 1, overflow: "hidden" }}>
            <Box sx={{ p: 2, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
              <Typography variant="h6">Required Documents</Typography>
              <Typography variant="body2" color="text.secondary">
                Compliance documents for this vehicle.
              </Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Reference Number</TableCell>
                  <TableCell>Expiry</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {VEHICLE_DOCUMENTS.map((doc) => (
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
              Verification
            </Typography>
            <Paper
              variant="outlined"
              sx={{ mt: 2, height: 200, display: "grid", placeItems: "center", bgcolor: "#f8fafc" }}
            >
              <Typography color="text.secondary" variant="body2">
                Document Preview Workspace
              </Typography>
            </Paper>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <TextField size="small" label="Document Type" defaultValue="Insurance Policy" />
              <TextField
                size="small"
                type="date"
                label="Expiry Date"
                InputLabelProps={{ shrink: true }}
                defaultValue="2024-11-30"
              />
              <TextField size="small" label="Admin Notes" multiline minRows={3} placeholder="Verification notes..." />
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="success" fullWidth>
                  Approve
                </Button>
                <Button variant="outlined" color="error" fullWidth>
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      ) : null}

      {activeTab === "History" ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Change History
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Full audit log for this vehicle record.
          </Typography>
          <ChangeLogTable rows={VEHICLE_CHANGE_LOG} />
        </Paper>
      ) : null}
    </Stack>
  );
}
