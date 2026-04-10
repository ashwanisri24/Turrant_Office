import {
  Box, Button, Chip, Paper, Stack, Table, TableBody,
  TableCell, TableHead, TableRow, Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";
import { ToolbarFilterField, ToolbarSearchField } from "../../components/filters/toolbar-fields";

const PASSENGERS = [
  { id: "PAX-001", name: "Priya Sharma", phone: "+91 98765 43210", trips: 12, status: "Active", needsWheelchair: false, blacklisted: false },
  { id: "PAX-002", name: "Rajan Mehta", phone: "+91 87654 32109", trips: 3, status: "Active", needsWheelchair: true, blacklisted: false },
  { id: "PAX-003", name: "Sunita Rao", phone: "+91 76543 21098", trips: 1, status: "Suspended", needsWheelchair: false, blacklisted: true }
];

export function PassengerListView() {
  const navigate = useNavigate();
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Passengers</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage passenger accounts, special needs, and blacklist status.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/passengers/create")}>
          Add Passenger
        </Button>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
          <ToolbarSearchField label="Search" placeholder="Search by name or phone..." fullWidth />
          <ToolbarFilterField label="Status" placeholder="All Statuses" options={[{ value: "active", label: "Active" }, { value: "suspended", label: "Suspended" }]} />
          <ToolbarFilterField label="Blacklisted" placeholder="All" options={[{ value: "yes", label: "Blacklisted" }, { value: "no", label: "Clear" }]} />
        </Stack>
      </Paper>
      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Passenger</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Trips</TableCell>
              <TableCell align="center">Wheelchair</TableCell>
              <TableCell align="center">Blacklisted</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PASSENGERS.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Box>
                    <Typography fontWeight={600} fontSize={13}>{p.name}</Typography>
                    <Typography variant="caption" color="text.secondary">ID: {p.id}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{p.phone}</TableCell>
                <TableCell align="center">{p.trips}</TableCell>
                <TableCell align="center">
                  {p.needsWheelchair
                    ? <Chip label="Yes" size="small" sx={{ bgcolor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe", fontWeight: 600, fontSize: 11 }} />
                    : <Typography variant="caption" color="text.disabled">—</Typography>}
                </TableCell>
                <TableCell align="center">
                  {p.blacklisted
                    ? <Chip label="Blacklisted" size="small" sx={{ bgcolor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", fontWeight: 600, fontSize: 11 }} />
                    : <Typography variant="caption" color="text.disabled">—</Typography>}
                </TableCell>
                <TableCell align="center"><StatusBadge label={p.status} /></TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => navigate(`/passengers/${p.id}`)}>View</Button>
                  <Button size="small" onClick={() => navigate(`/passengers/${p.id}/edit`)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
