import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ToolbarFilterField, ToolbarSearchField } from "../../components/filters/toolbar-fields";
import { ImportExportToolbar } from "../../components/shared/ImportExportToolbar";
import { ColumnVisibilityToggle, type ColDef } from "../../components/shared/ColumnVisibilityToggle";

const DRIVERS = [
  {
    id: "DRV-8921",
    name: "Sarah Chen",
    phone: "+1 (555) 987-6543",
    license: "DL-12345678",
    licenseType: "Car",
    owners: ["Speedy Delivery Inc."],
    verification: "Pending",
    status: "Offline",
    engagementStatus: "Available"
  },
  {
    id: "DRV-2201",
    name: "Michael Ross",
    phone: "+1 (555) 456-7890",
    license: "DL-24681357",
    licenseType: "Bus",
    owners: ["Logistics Prime LLC", "GreenLine Logistics"],
    verification: "Flagged",
    status: "Online",
    engagementStatus: "On Trip"
  }
];

const ALL_COLUMNS: ColDef[] = [
  { key: "name", label: "Driver Name" },
  { key: "phone", label: "Phone Number" },
  { key: "license", label: "License Number" },
  { key: "licenseType", label: "License Type" },
  { key: "owner", label: "Fleet Owner" },
  { key: "engagement", label: "Engagement" },
  { key: "verification", label: "Verification" },
  { key: "status", label: "Status" }
];

function exportDriversCSV() {
  const headers = ["ID", "Name", "Phone", "License", "License Type", "Owners", "Engagement", "Verification", "Status"];
  const rows = DRIVERS.map((d) =>
    [d.id, d.name, d.phone, d.license, d.licenseType, d.owners.join("; "), d.engagementStatus, d.verification, d.status]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "drivers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function DriverListView() {
  const navigate = useNavigate();
  const [visibleCols, setVisibleCols] = useState(ALL_COLUMNS.map((c) => c.key));

  const show = (key: string) => visibleCols.includes(key);

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Drivers Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage verification, status, and fleet assignments.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <ImportExportToolbar entityName="driver" onExport={exportDriversCSV} />
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/drivers/create")}>
            Add New Driver
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5} flexWrap="wrap">
          <ToolbarSearchField
            label="Search"
            placeholder="Search by driver name or phone number..."
            fullWidth
          />
          <ToolbarFilterField
            label="Owner"
            placeholder="All Fleets"
            options={[
              { value: "speedy", label: "Speedy Delivery Inc." },
              { value: "prime", label: "Logistics Prime LLC" },
              { value: "greenline", label: "GreenLine Logistics" }
            ]}
          />
          <ToolbarFilterField
            label="License Type"
            placeholder="All Types"
            options={[
              { value: "car", label: "Car" },
              { value: "bus", label: "Bus" },
              { value: "truck", label: "Truck" },
              { value: "heavy-goods", label: "Heavy Goods" }
            ]}
          />
          <ToolbarFilterField
            label="Engagement"
            placeholder="All"
            options={[
              { value: "available", label: "Available" },
              { value: "on-trip", label: "On Trip" },
              { value: "offline", label: "Offline" },
              { value: "suspended", label: "Suspended" }
            ]}
          />
          <ToolbarFilterField
            label="Verification"
            placeholder="All Statuses"
            options={[
              { value: "pending", label: "Pending" },
              { value: "flagged", label: "Flagged" },
              { value: "verified", label: "Verified" }
            ]}
          />
          <ToolbarFilterField
            label="Status"
            placeholder="All"
            options={[
              { value: "online", label: "Online" },
              { value: "offline", label: "Offline" }
            ]}
          />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <ColumnVisibilityToggle
              columns={ALL_COLUMNS}
              visible={visibleCols}
              onChange={setVisibleCols}
            />
          </Box>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {show("name") && <TableCell>Driver Name</TableCell>}
              {show("phone") && <TableCell>Phone Number</TableCell>}
              {show("license") && <TableCell>License Number</TableCell>}
              {show("licenseType") && <TableCell>License Type</TableCell>}
              {show("owner") && <TableCell>Fleet Owner(s)</TableCell>}
              {show("engagement") && <TableCell>Engagement</TableCell>}
              {show("verification") && <TableCell>Verification</TableCell>}
              {show("status") && <TableCell>Status</TableCell>}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DRIVERS.map((driver) => (
              <TableRow key={driver.id} hover>
                {show("name") && (
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ p: 0, textAlign: "left", justifyContent: "flex-start" }}
                      onClick={() => navigate(`/drivers/${driver.id}`)}
                    >
                      <Box>
                        <Typography fontWeight={600} fontSize={13}>{driver.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {driver.id}
                        </Typography>
                      </Box>
                    </Button>
                  </TableCell>
                )}
                {show("phone") && <TableCell>{driver.phone}</TableCell>}
                {show("license") && <TableCell>{driver.license}</TableCell>}
                {show("licenseType") && (
                  <TableCell>
                    <Chip
                      label={driver.licenseType}
                      size="small"
                      sx={{ bgcolor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", fontWeight: 600, fontSize: 11 }}
                    />
                  </TableCell>
                )}
                {show("owner") && (
                  <TableCell>
                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {driver.owners.map((o) => (
                        <Chip key={o} label={o} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                      ))}
                    </Stack>
                  </TableCell>
                )}
                {show("engagement") && (
                  <TableCell>
                    <StatusBadge label={driver.engagementStatus} />
                  </TableCell>
                )}
                {show("verification") && (
                  <TableCell>
                    <StatusBadge label={driver.verification} />
                  </TableCell>
                )}
                {show("status") && (
                  <TableCell>
                    <StatusBadge label={driver.status} />
                  </TableCell>
                )}
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/drivers/${driver.id}`)}>
                    View
                  </Button>
                  <Button size="small" onClick={() => navigate(`/drivers/${driver.id}/edit`)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
