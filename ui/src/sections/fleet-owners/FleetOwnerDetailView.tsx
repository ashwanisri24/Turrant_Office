import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
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
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DomainIcon from "@mui/icons-material/Domain";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ImportExportToolbar } from "../../components/shared/ImportExportToolbar";
import { ChangeLogTable, type ChangeLogRow } from "../../components/shared/ChangeLogTable";

const TOP_TABS = ["Overview", "Documents & Verification", "Vehicles", "Drivers", "Compliance", "Activity & Audit"];

const KPI_CARDS = [
  { label: "TOTAL EARNINGS", value: "$45,200", note: "vs. previous month", accent: "^12%" },
  { label: "ACTIVE DRIVERS", value: "12 / 15", note: "Current assigned drivers", progress: 80 },
  { label: "TOTAL TRIPS", value: "1,240", note: "Lifetime completed trips" }
];

const FLEET_DOCUMENTS = [
  { name: "GST Certificate", number: "07AAACG1234A1Z5", status: "Verified", expiry: "2025-03-31", updated: "Oct 10, 2023" },
  { name: "PAN Card", number: "AAACG1234A", status: "Verified", expiry: "—", updated: "Oct 10, 2023" },
  { name: "Trade License", number: "TL-MH-2023-88290", status: "Pending", expiry: "2024-12-31", updated: "Nov 02, 2023" },
  { name: "Certificate of Incorporation", number: "U60200MH2020PTC338819", status: "Verified", expiry: "—", updated: "Oct 10, 2023" },
  { name: "Bank Verification Letter", number: "HDFC0001234", status: "Review", expiry: "—", updated: "Oct 20, 2023" }
];

const ACTIVITY_ITEMS = [
  {
    time: "Just now",
    title: "Profile verified by System Admin",
    note: "Automated compliance check completed successfully.",
    tone: "#5d8c2f"
  },
  {
    time: "2 hours ago",
    title: "Documents Uploaded",
    note: "gst_certificate_2024.pdf",
    tone: "#c8ccd4"
  },
  {
    time: "Yesterday at 4:30 PM",
    title: "Email Address Updated",
    note: "Changed from info@greenline.com to rajesh@greenline.com",
    tone: "#c8ccd4"
  },
  {
    time: "Oct 24, 2023",
    title: "Support Ticket #992 Closed",
    note: "Issue regarding payment gateway resolved.",
    tone: "#f5b56b"
  },
  {
    time: "Oct 20, 2023",
    title: "Account Created",
    note: "User signed up via web portal.",
    tone: "#c8ccd4"
  }
];

const ASSIGNED_VEHICLES = [
  {
    id: "TR-2023-X99",
    model: "Toyota Fortuner",
    driver: "Rajesh Kumar",
    driverId: "DRV-1104",
    license: "MH 12 AB 4901",
    status: "Active",
    action: "Manage Driver"
  },
  {
    id: "TR-2021-A45",
    model: "Volvo FH16",
    driver: "Amit Singh",
    driverId: "DRV-1178",
    license: "DL 04 CK 2840",
    status: "Scheduled",
    action: "Manage Driver"
  },
  {
    id: "TR-2019-H10",
    model: "Tata Ace",
    driver: "Arjun Verma",
    driverId: "DRV-1019",
    license: "GJ 01 JK 1920",
    status: "Inactive",
    action: "Assign Driver"
  }
];

const ASSIGNED_DRIVERS = [
  {
    id: "DRV-1104",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    assignedVehicle: "TR-2023-X99",
    status: "Active"
  },
  {
    id: "DRV-1178",
    name: "Amit Singh",
    phone: "+91 98214 12003",
    assignedVehicle: "TR-2021-A45",
    status: "Scheduled"
  },
  {
    id: "DRV-1019",
    name: "Arjun Verma",
    phone: "+91 97654 87965",
    assignedVehicle: "TR-2019-H10",
    status: "Inactive"
  }
];

const AUDIT_LOG: ChangeLogRow[] = [
  {
    timestamp: "2023-11-02 10:15:33",
    admin: "System Admin",
    action: "Status Changed",
    field: "Account Status",
    oldValue: "Pending",
    newValue: "Verified",
    ipDevice: "10.0.0.1 / System"
  },
  {
    timestamp: "2023-11-02 10:14:00",
    admin: "System Admin",
    action: "Document Uploaded",
    field: "GST Certificate",
    oldValue: "—",
    newValue: "gst_certificate_2024.pdf",
    ipDevice: "10.0.0.1 / System"
  },
  {
    timestamp: "2023-10-24 16:30:00",
    admin: "Admin Sarah",
    action: "Field Updated",
    field: "Email",
    oldValue: "info@greenline.com",
    newValue: "rajesh@greenline.com",
    ipDevice: "192.168.1.45 / Chrome (Mac)"
  },
  {
    timestamp: "2023-10-20 09:00:00",
    admin: "System",
    action: "Account Created",
    field: "Account",
    oldValue: "—",
    newValue: "Fleet Owner Created",
    ipDevice: "10.0.0.1 / System"
  }
];

function exportFleetOwnerData() {
  const headers = ["Field", "Value"];
  const data = [
    ["Legal Entity", "GreenLine Logistics Pvt Ltd."],
    ["Registration No", "REG-882910-XJ"],
    ["Tax ID", "07AAACG1234A1Z5"],
    ["City", "Gurgaon"],
    ["Contact", "Rajesh Kumar"],
    ["Email", "rajesh@greenline.com"],
    ["Phone", "+91 98765 43210"]
  ];
  const csv = [headers.join(","), ...data.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fleet_owner_greenline.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function FleetOwnerDetailView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [newDriverId, setNewDriverId] = useState("");
  const [effectiveAt, setEffectiveAt] = useState("");
  const [assignmentReason, setAssignmentReason] = useState("");

  const selectedVehicle = ASSIGNED_VEHICLES.find((vehicle) => vehicle.id === selectedVehicleId) ?? null;
  const selectedDriver = ASSIGNED_DRIVERS.find((driver) => driver.id === selectedVehicle?.driverId) ?? null;

  const handleOpenReassignDialog = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setNewDriverId("");
    setEffectiveAt("");
    setAssignmentReason("");
    setIsReassignDialogOpen(true);
  };

  const handleCloseReassignDialog = () => {
    setIsReassignDialogOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Operations {" > "} Fleet Owners {" > "} GreenLine Logistics
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.25} flexWrap="wrap">
                <Typography variant="h4" sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 700 }}>
                  GreenLine Logistics Pvt Ltd
                </Typography>
                <StatusBadge label="Verified" />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Partner ID: FLT-2023-892 • Joined Oct 2021
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
              <ImportExportToolbar entityName="fleet owner" onExport={exportFleetOwnerData} />
              <Button variant="outlined" color="inherit">
                Suspend
              </Button>
              <Button variant="outlined" color="error">
                Reject
              </Button>
              <Button variant="contained" color="success">
                Approve
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
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8.7}>
          <Stack spacing={2}>
            <Grid container spacing={1.5}>
              {KPI_CARDS.map((item) => (
                <Grid item xs={12} md={4} key={item.label}>
                  <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 0.4 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 0.8, fontSize: 36, fontWeight: 700 }}>
                      {item.value}
                    </Typography>
                    {item.progress ? (
                      <Box sx={{ mt: 1.25 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.progress}
                          sx={{ height: 6, borderRadius: 999, bgcolor: "#edf2f7", "& .MuiLinearProgress-bar": { bgcolor: "#5d8c2f" } }}
                        />
                      </Box>
                    ) : null}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {item.note}
                      </Typography>
                      {item.accent ? <StatusBadge label={item.accent} showDot={false} /> : null}
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Paper variant="outlined" sx={{ overflow: "hidden" }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <DomainIcon sx={{ color: "#64748b", fontSize: 20 }} />
                  <Typography variant="h6">Company Master Data</Typography>
                </Stack>
                <Button variant="text" size="small" startIcon={<EditIcon />} sx={{ color: "#4d7c0f" }}>
                  Edit
                </Button>
              </Stack>
              <Divider />
              <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    LEGAL ENTITY NAME
                  </Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>GreenLine Logistics Pvt Ltd.</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    REGISTRATION NUMBER
                  </Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>REG-882910-XJ</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    REGISTERED ADDRESS
                  </Typography>
                  <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
                    <PlaceOutlinedIcon sx={{ color: "#64748b", fontSize: 18, mt: 0.2 }} />
                    <Typography sx={{ fontWeight: 600 }}>Unit 404, Business Bay Tower, Sector 45, Gurgaon, HR 122003</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    TAX ID (GST/VAT)
                  </Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 0.5 }}>
                    <Typography sx={{ fontWeight: 600 }}>07AAACG1234A1Z5</Typography>
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, color: "#65a30d" }} />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    PRIMARY CONTACT PERSON
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        bgcolor: "#fde68a",
                        color: "#7c2d12",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 700
                      }}
                    >
                      RK
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }}>Rajesh Kumar</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Director of Operations
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    CONTACT DETAILS
                  </Typography>
                  <Stack spacing={0.6} sx={{ mt: 0.5 }}>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <DescriptionOutlinedIcon sx={{ color: "#64748b", fontSize: 16 }} />
                      <Typography sx={{ fontWeight: 600 }}>rajesh@greenline.com</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <PhoneOutlinedIcon sx={{ color: "#64748b", fontSize: 16 }} />
                      <Typography sx={{ fontWeight: 600 }}>+91 98765 43210</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    CONTRACT START DATE
                  </Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2021-10-01</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    CONTRACT END DATE
                  </Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>2025-10-01</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper variant="outlined" sx={{ overflow: "hidden" }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2 }}>
                <CreditCardIcon sx={{ color: "#64748b", fontSize: 20 }} />
                <Typography variant="h6">Banking Information</Typography>
              </Stack>
              <Divider />
              <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">
                    BANK NAME
                  </Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>HDFC Bank Ltd.</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">
                    ACCOUNT NUMBER
                  </Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>XXXX-XXXX-8921</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="caption" color="text.secondary">
                    IFSC CODE
                  </Typography>
                  <Typography sx={{ fontWeight: 600, mt: 0.5 }}>HDFC0001234</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    VERIFICATION STATUS
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <StatusBadge label="Verified" showDot={false} />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

          </Stack>
        </Grid>

        <Grid item xs={12} lg={3.3}>
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontSize: 20 }}>
                  Recent Activity
                </Typography>
                <Button variant="text" size="small" sx={{ color: "#4d7c0f" }}>
                  View all
                </Button>
              </Stack>

              <Stack spacing={2} sx={{ mt: 1.5 }}>
                {ACTIVITY_ITEMS.map((item, index) => (
                  <Stack key={`${item.time}-${item.title}`} direction="row" spacing={1.25}>
                    <Stack alignItems="center" sx={{ pt: 0.2 }}>
                      <CircleIcon sx={{ fontSize: 10, color: item.tone }} />
                      {index !== ACTIVITY_ITEMS.length - 1 ? (
                        <Box sx={{ width: 2, flex: 1, minHeight: 36, bgcolor: "#e2e8f0", mt: 0.5 }} />
                      ) : null}
                    </Stack>
                    <Box sx={{ pb: 0.2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                      <Typography sx={{ fontWeight: 700, lineHeight: 1.3, mt: 0.2 }}>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                        {item.note}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Button variant="outlined" fullWidth sx={{ mt: 2 }} startIcon={<ModeCommentOutlinedIcon />}>
                Add Note
              </Button>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontSize: 20 }}>
                  Fleet Health
                </Typography>
                <PersonOutlineIcon sx={{ color: "#94a3b8" }} />
              </Stack>
              <Stack spacing={1.25} sx={{ mt: 1.5 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Active</Typography>
                  <Typography sx={{ fontWeight: 700 }}>12</Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={80}
                  sx={{ height: 7, borderRadius: 999, bgcolor: "#edf2f7", "& .MuiLinearProgress-bar": { bgcolor: "#5d8c2f" } }}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Maintenance</Typography>
                  <Typography sx={{ fontWeight: 700 }}>2</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Out of service</Typography>
                  <Typography sx={{ fontWeight: 700 }}>1</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      ) : null}

      {activeTab === "Documents & Verification" ? (
        <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
          <Paper variant="outlined" sx={{ flex: 1, overflow: "hidden" }}>
            <Box sx={{ p: 2, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
              <Typography variant="h6">Documents & Verification</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage compliance documents for this fleet owner.
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
                {FLEET_DOCUMENTS.map((doc) => (
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
              Document Preview
            </Typography>
            <Paper
              variant="outlined"
              sx={{ mt: 2, height: 300, display: "grid", placeItems: "center", bgcolor: "#f8fafc" }}
            >
              <Typography color="text.secondary" variant="body2">
                Select a document to preview
              </Typography>
            </Paper>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <TextField size="small" label="Document Type" defaultValue="GST Certificate" />
              <TextField size="small" label="Reference Number" defaultValue="07AAACG1234A1Z5" />
              <TextField size="small" type="date" label="Expiry Date" InputLabelProps={{ shrink: true }} defaultValue="2025-03-31" />
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

      {activeTab === "Vehicles" ? (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalShippingOutlinedIcon sx={{ color: "#64748b", fontSize: 20 }} />
              <Typography variant="h6">Assigned vehicles</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Current vehicles assigned to this fleet owner.
            </Typography>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Assigned Driver</TableCell>
                <TableCell>License Plate</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ASSIGNED_VEHICLES.map((vehicle) => (
                <TableRow key={vehicle.id} hover>
                  <TableCell>
                    <Button size="small" onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
                      {vehicle.id}
                    </Button>
                  </TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => navigate(`/drivers/${vehicle.driverId}`)}>
                      {vehicle.driver}
                    </Button>
                  </TableCell>
                  <TableCell>{vehicle.license}</TableCell>
                  <TableCell>
                    <StatusBadge label={vehicle.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant={vehicle.action === "Assign Driver" ? "contained" : "outlined"}
                      onClick={() => handleOpenReassignDialog(vehicle.id)}
                    >
                      {vehicle.action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : null}

      {activeTab === "Drivers" ? (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonOutlineIcon sx={{ color: "#64748b", fontSize: 20 }} />
              <Typography variant="h6">Assigned drivers</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Drivers currently mapped to this fleet owner.
            </Typography>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Driver ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Assigned Vehicle</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ASSIGNED_DRIVERS.map((driver) => (
                <TableRow key={driver.id} hover>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => navigate(`/drivers/${driver.id}`)}>
                      {driver.name}
                    </Button>
                  </TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => navigate(`/vehicles/${driver.assignedVehicle}`)}>
                      {driver.assignedVehicle}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <StatusBadge label={driver.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : null}

      {activeTab === "Activity & Audit" ? (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Activity & Audit Log
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Full change history for this fleet owner profile.
          </Typography>
          <ChangeLogTable rows={AUDIT_LOG} />
        </Paper>
      ) : null}

      <Dialog open={isReassignDialogOpen} onClose={handleCloseReassignDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.25} alignItems="center">
              <AssignmentIndOutlinedIcon color="primary" />
              <Box>
                <Typography variant="h6" sx={{ fontSize: 20, lineHeight: 1.2 }}>
                  Reassign Driver
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fleet Management - Turrant
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleCloseReassignDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          <Paper variant="outlined" sx={{ mb: 2 }}>
            <Grid container>
              <Grid item xs={12} md={6} sx={{ p: 2 }}>
                <Typography variant="caption" color="primary.main" sx={{ fontWeight: 700 }}>
                  CURRENT ASSIGNMENT
                </Typography>
                <Typography sx={{ mt: 1.25, fontWeight: 700 }}>
                  {selectedVehicle?.model ?? "Tata Prima 4025.S"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Vehicle ID: {selectedVehicle?.id ?? "TR-09"} • Plate: {selectedVehicle?.license ?? "KA 01 HJ 9876"}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ p: 2, borderLeft: { md: "1px solid rgba(15, 23, 42, 0.08)" } }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                  OCCUPYING DRIVER
                </Typography>
                <Typography sx={{ mt: 1.25, fontWeight: 700 }}>
                  {selectedDriver?.name ?? "Rajesh Kumar"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  ID: {selectedDriver?.id ?? "DRV-8829"} • 4.8 ★
                </Typography>
                <Button size="small" sx={{ mt: 0.5 }} onClick={() => selectedDriver ? navigate(`/drivers/${selectedDriver.id}`) : undefined}>
                  View Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Stack spacing={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              New Assignment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Select New Driver"
                  value={newDriverId}
                  onChange={(event) => setNewDriverId(event.target.value)}
                >
                  <MenuItem value="">Search available drivers</MenuItem>
                  {ASSIGNED_DRIVERS.filter((driver) => driver.id !== selectedVehicle?.driverId).map((driver) => (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name} ({driver.id})
                    </MenuItem>
                  ))}
                </TextField>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                  Only showing verified drivers currently off-duty.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Effective Date & Time"
                  type="datetime-local"
                  value={effectiveAt}
                  onChange={(event) => setEffectiveAt(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Reason for Assignment"
              placeholder="e.g. Previous driver on leave, Route change, Regular rotation..."
              value={assignmentReason}
              onChange={(event) => setAssignmentReason(event.target.value)}
            />

            <Box
              sx={{
                px: 1.5,
                py: 1.25,
                borderRadius: 1,
                border: "1px solid #facc15",
                bgcolor: "#fefce8"
              }}
            >
              <Typography variant="body2" sx={{ color: "#92400e" }}>
                Note: This action will overwrite the current driver assignment for this vehicle and log the change in history.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleCloseReassignDialog}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCloseReassignDialog}>
            Confirm Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
