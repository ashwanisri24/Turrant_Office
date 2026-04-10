import { Box, Button, Divider, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../../components/status/status-badge";

const DOCUMENTS = [
  { name: "Insurance Policy", status: "Needs Review", updated: "Uploaded 2 hours ago" },
  { name: "Vehicle Registration", status: "Verified", updated: "Valid until Dec 2024" },
  { name: "Fitness Certificate", status: "Rejected", updated: "Expired: Oct 01, 2023" },
  { name: "Heavy Goods Permit", status: "Missing", updated: "Not uploaded" }
];

export function VehicleComplianceView() {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Vehicle TR-8842 (Ford Transit)</Typography>
          <Typography variant="body2" color="text.secondary">
            Compliance Documents
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" onClick={() => navigate("/vehicles/TR-8842/edit")}>
            Edit Details
          </Button>
          <Button variant="outlined" color="error">
            Suspend Vehicle
          </Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
        <Paper variant="outlined" sx={{ width: { xs: "100%", xl: 360 } }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2">Required Documents</Typography>
            <TextField size="small" fullWidth sx={{ mt: 1.5 }} placeholder="Filter documents..." />
          </Box>
          <Divider />
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DOCUMENTS.map((doc) => (
                <TableRow key={doc.name} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{doc.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doc.updated}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge label={doc.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, p: 3, minHeight: 520 }}>
          <Typography variant="h6">Document Preview</Typography>
          <Typography variant="body2" color="text.secondary">
            Insurance Policy (Commercial Vehicle)
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              mt: 2,
              height: 420,
              display: "grid",
              placeItems: "center",
              bgcolor: "#f8fafc"
            }}
          >
            <Typography color="text.secondary">Preview Workspace</Typography>
          </Paper>
        </Paper>

        <Paper variant="outlined" sx={{ width: { xs: "100%", xl: 340 }, p: 2.5 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Verification
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Review and approve or reject this document.
          </Typography>
          <Stack spacing={1.5}>
            <TextField label="Document Type" value="Insurance Policy (Commercial)" />
            <TextField label="Extracted Expiry Date" type="date" defaultValue="2025-10-24" />
            <TextField label="Admin Notes" multiline minRows={4} placeholder="Add mandatory notes if rejecting..." />
            <Stack direction="row" spacing={1.5}>
              <Button fullWidth variant="outlined" color="error" startIcon={<CloseIcon />}>
                Reject
              </Button>
              <Button fullWidth variant="contained" startIcon={<CheckIcon />}>
                Approve
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
