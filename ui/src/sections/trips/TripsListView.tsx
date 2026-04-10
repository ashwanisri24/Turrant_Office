import {
  Box, Button, Chip, Paper, Stack, Table, TableBody,
  TableCell, TableHead, TableRow, Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ToolbarFilterField, ToolbarSearchField } from "../../components/filters/toolbar-fields";

const TRIPS = [
  { id: "TRP-0001", passenger: "Priya Sharma", driver: "Sarah Chen", vehicle: "MH-12-AB-1234", from: "Pune", to: "Mumbai", fare: "₹1,200", status: "Completed", date: "2024-03-10" },
  { id: "TRP-0002", passenger: "Rajan Mehta", driver: "Michael Ross", vehicle: "KA-01-CD-5678", from: "Bengaluru", to: "Mysuru", fare: "₹800", status: "In Progress", date: "2024-03-11" },
  { id: "TRP-0003", passenger: "Sunita Rao", driver: "—", vehicle: "—", from: "Delhi", to: "Agra", fare: "—", status: "Cancelled", date: "2024-03-11" }
];

export function TripsListView() {
  const navigate = useNavigate();
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Rides</Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor all trip activity, cancellations, and GPS fraud alerts.
          </Typography>
        </Box>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
          <ToolbarSearchField label="Search" placeholder="Search by trip ID, passenger, or driver..." fullWidth />
          <ToolbarFilterField label="Status" placeholder="All Statuses" options={[
            { value: "requested", label: "Requested" },
            { value: "in_progress", label: "In Progress" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" }
          ]} />
        </Stack>
      </Paper>
      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Trip ID</TableCell>
              <TableCell>Passenger</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>From → To</TableCell>
              <TableCell align="right">Fare</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TRIPS.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell>
                  <Typography fontWeight={600} fontSize={13}>{t.id}</Typography>
                </TableCell>
                <TableCell>{t.passenger}</TableCell>
                <TableCell>{t.driver}</TableCell>
                <TableCell>{t.vehicle}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Chip label={t.from} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                    <Typography variant="caption">→</Typography>
                    <Chip label={t.to} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                  </Stack>
                </TableCell>
                <TableCell align="right">{t.fare}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell align="center"><StatusBadge label={t.status} /></TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/rides/${t.id}`)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
