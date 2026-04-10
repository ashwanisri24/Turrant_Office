import {
  Box, Button, Chip, Paper, Stack, Table, TableBody,
  TableCell, TableHead, TableRow, Typography
} from "@mui/material";
import { ToolbarFilterField, ToolbarSearchField } from "../../components/filters/toolbar-fields";

const BLACKLIST = [
  { id: "BL-001", entityType: "Driver", name: "Michael Ross", phone: "+1 (555) 456-7890", reason: "GPS Fraud", trip: "TRP-0003", date: "2024-03-11", active: true },
  { id: "BL-002", entityType: "Passenger", name: "Sunita Rao", phone: "+91 76543 21098", reason: "Repeated Cancellation", trip: "TRP-0007", date: "2024-02-28", active: true },
  { id: "BL-003", entityType: "Driver", name: "Amit Kumar", phone: "+91 99887 76655", reason: "No Show", trip: "TRP-0002", date: "2024-01-15", active: false }
];

export function BlacklistView() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Blacklist</Typography>
        <Typography variant="body2" color="text.secondary">
          Drivers and passengers flagged for fraud, no-shows, or repeated cancellations.
        </Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
          <ToolbarSearchField label="Search" placeholder="Search by name or phone..." fullWidth />
          <ToolbarFilterField label="Type" placeholder="All" options={[{ value: "driver", label: "Driver" }, { value: "passenger", label: "Passenger" }]} />
          <ToolbarFilterField label="Reason" placeholder="All Reasons" options={[
            { value: "gps_fraud", label: "GPS Fraud" },
            { value: "no_show", label: "No Show" },
            { value: "cancellation", label: "Repeated Cancellation" },
            { value: "abuse", label: "Abuse" }
          ]} />
          <ToolbarFilterField label="Status" placeholder="All" options={[{ value: "active", label: "Active" }, { value: "lifted", label: "Lifted" }]} />
        </Stack>
      </Paper>
      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Trip</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {BLACKLIST.map((b) => (
              <TableRow key={b.id} hover>
                <TableCell>{b.id}</TableCell>
                <TableCell>
                  <Chip label={b.entityType} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                </TableCell>
                <TableCell><Typography fontWeight={600} fontSize={13}>{b.name}</Typography></TableCell>
                <TableCell>{b.phone}</TableCell>
                <TableCell>
                  <Chip label={b.reason} size="small" sx={{ bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", fontWeight: 600, fontSize: 11 }} />
                </TableCell>
                <TableCell>{b.trip}</TableCell>
                <TableCell>{b.date}</TableCell>
                <TableCell align="center">
                  {b.active
                    ? <Chip label="Active" size="small" sx={{ bgcolor: "#fef2f2", color: "#dc2626", fontWeight: 600, fontSize: 11 }} />
                    : <Chip label="Lifted" size="small" sx={{ bgcolor: "#f0fdf4", color: "#16a34a", fontWeight: 600, fontSize: 11 }} />}
                </TableCell>
                <TableCell align="right">
                  {b.active && <Button size="small" color="warning">Lift</Button>}
                  <Button size="small">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
