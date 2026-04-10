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
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import {
  ToolbarFilterField,
  ToolbarIconActionButton,
  ToolbarSearchField
} from "../../components/filters/toolbar-fields";
import { ImportExportToolbar } from "../../components/shared/ImportExportToolbar";
import { ColumnVisibilityToggle, type ColDef } from "../../components/shared/ColumnVisibilityToggle";

const VEHICLES = [
  {
    id: "TR-2023-X99",
    type: "SUV",
    model: "Toyota Fortuner",
    year: "2022",
    passengerCapacity: 6,
    owner: "Logistics Corp",
    driver: "John Doe",
    verification: "Verified",
    status: "Active",
    engagementStatus: "On Trip",
    isRental: false
  },
  {
    id: "TR-2021-A45",
    type: "Truck",
    model: "Volvo FH16",
    year: "2021",
    passengerCapacity: 2,
    owner: "Global Freight",
    driver: "Mike Smith",
    verification: "Pending",
    status: "Out of Service",
    engagementStatus: "Offline",
    isRental: true
  }
];

const ALL_COLUMNS: ColDef[] = [
  { key: "regNo", label: "Registration No" },
  { key: "type", label: "Type" },
  { key: "model", label: "Model" },
  { key: "year", label: "Year" },
  { key: "capacity", label: "Capacity" },
  { key: "owner", label: "Fleet Owner" },
  { key: "driver", label: "Current Driver" },
  { key: "engagement", label: "Engagement" },
  { key: "rental", label: "Rental" },
  { key: "verification", label: "Verification" },
  { key: "status", label: "Status" }
];

function exportVehiclesCSV() {
  const headers = ["ID", "Type", "Model", "Year", "Capacity", "Owner", "Driver", "Engagement", "Rental", "Verification", "Status"];
  const rows = VEHICLES.map((v) =>
    [v.id, v.type, v.model, v.year, v.passengerCapacity, v.owner, v.driver, v.engagementStatus, v.isRental ? "Yes" : "No", v.verification, v.status]
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vehicles.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function VehicleListView() {
  const navigate = useNavigate();
  const [visibleCols, setVisibleCols] = useState(ALL_COLUMNS.map((c) => c.key));

  const show = (key: string) => visibleCols.includes(key);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Vehicles</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, verify, and track your vehicle registry.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <ImportExportToolbar entityName="vehicle" onExport={exportVehiclesCSV} />
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/vehicles/create")}>
            Add Vehicle
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} flexWrap="wrap">
          <ToolbarSearchField
            label="Search"
            placeholder="Search by Registration Number..."
            fullWidth
          />
          <ToolbarFilterField
            label="Fleet Owner"
            placeholder="All Owners"
            options={[
              { value: "logistics-corp", label: "Logistics Corp" },
              { value: "global-freight", label: "Global Freight" }
            ]}
          />
          <ToolbarFilterField
            label="Status"
            placeholder="All Statuses"
            options={[
              { value: "active", label: "Active" },
              { value: "out-of-service", label: "Out of Service" },
              { value: "maintenance", label: "Maintenance" }
            ]}
          />
          <ToolbarFilterField
            label="Type"
            placeholder="All Types"
            options={[
              { value: "sedan", label: "Sedan" },
              { value: "suv", label: "SUV" },
              { value: "truck", label: "Truck" },
              { value: "van", label: "Van" }
            ]}
          />
          <ToolbarFilterField
            label="Year"
            placeholder="All Years"
            options={[
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
              { value: "2021", label: "2021" },
              { value: "2020", label: "2020" }
            ]}
          />
          <ToolbarFilterField
            label="Capacity"
            placeholder="All Capacities"
            options={[
              { value: "2", label: "2 seats" },
              { value: "4", label: "4 seats" },
              { value: "6", label: "6 seats" },
              { value: "8plus", label: "8+ seats" }
            ]}
          />
          <ToolbarFilterField
            label="Engagement"
            placeholder="All Statuses"
            options={[
              { value: "available", label: "Available" },
              { value: "on-trip", label: "On Trip" },
              { value: "offline", label: "Offline" }
            ]}
          />
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <ToolbarIconActionButton title="Refresh Data" icon={<RefreshIcon fontSize="small" />} />
            <ColumnVisibilityToggle
              columns={ALL_COLUMNS}
              visible={visibleCols}
              onChange={setVisibleCols}
            />
          </Stack>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {show("regNo") && <TableCell>Registration No</TableCell>}
              {show("type") && <TableCell>Type</TableCell>}
              {show("model") && <TableCell>Model</TableCell>}
              {show("year") && <TableCell>Year</TableCell>}
              {show("capacity") && <TableCell align="center">Capacity</TableCell>}
              {show("owner") && <TableCell>Fleet Owner</TableCell>}
              {show("driver") && <TableCell>Current Driver</TableCell>}
              {show("engagement") && <TableCell align="center">Engagement</TableCell>}
              {show("rental") && <TableCell align="center">Rental</TableCell>}
              {show("verification") && <TableCell align="center">Verification</TableCell>}
              {show("status") && <TableCell align="center">Status</TableCell>}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {VEHICLES.map((vehicle) => (
              <TableRow key={vehicle.id} hover>
                {show("regNo") && (
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                    >
                      {vehicle.id}
                    </Button>
                  </TableCell>
                )}
                {show("type") && <TableCell>{vehicle.type}</TableCell>}
                {show("model") && <TableCell>{vehicle.model}</TableCell>}
                {show("year") && <TableCell>{vehicle.year}</TableCell>}
                {show("capacity") && (
                  <TableCell align="center">{vehicle.passengerCapacity}</TableCell>
                )}
                {show("owner") && <TableCell>{vehicle.owner}</TableCell>}
                {show("driver") && <TableCell>{vehicle.driver}</TableCell>}
                {show("engagement") && (
                  <TableCell align="center">
                    <StatusBadge label={vehicle.engagementStatus} />
                  </TableCell>
                )}
                {show("rental") && (
                  <TableCell align="center">
                    {vehicle.isRental ? (
                      <Chip label="Rental" size="small" sx={{ bgcolor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", fontWeight: 600, fontSize: 11 }} />
                    ) : (
                      <Typography variant="caption" color="text.disabled">—</Typography>
                    )}
                  </TableCell>
                )}
                {show("verification") && (
                  <TableCell align="center">
                    <StatusBadge label={vehicle.verification} />
                  </TableCell>
                )}
                {show("status") && (
                  <TableCell align="center">
                    <StatusBadge label={vehicle.status} />
                  </TableCell>
                )}
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/vehicles/${vehicle.id}/compliance`)}>
                    Docs
                  </Button>
                  <Button size="small" onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}>
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
