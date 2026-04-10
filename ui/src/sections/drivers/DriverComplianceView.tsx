import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { StatusBadge } from "../../components/status/status-badge";

const DOCUMENTS = [
  { name: "Commercial Driver's License", status: "Review", updated: "Updated: Oct 24, 2023" },
  { name: "Medical Examiner Cert", status: "Verified", updated: "Updated: Sep 12, 2023" },
  { name: "Insurance Card", status: "Rejected", updated: "Updated: Oct 20, 2023" },
  { name: "Background Check", status: "Missing", updated: "Due: Nov 01, 2023" }
];

export function DriverComplianceView() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Marcus Vance</Typography>
        <Typography variant="body2" color="text.secondary">
          Driver Detail & Compliance
        </Typography>
      </Box>

      <Stack direction={{ xs: "column", xl: "row" }} spacing={2}>
        <Paper variant="outlined" sx={{ width: { xs: "100%", xl: 320 }, p: 2 }}>
          <Typography variant="subtitle2">Documents</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {DOCUMENTS.map((doc) => (
              <Paper key={doc.name} variant="outlined" sx={{ p: 1.5 }}>
                <Typography fontWeight={600} fontSize={14}>
                  {doc.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {doc.updated}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <StatusBadge label={doc.status} />
                </Box>
              </Paper>
            ))}
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, p: 3, minHeight: 520 }}>
          <Typography variant="h6">Document Preview</Typography>
          <Paper
            variant="outlined"
            sx={{ mt: 2, height: 430, display: "grid", placeItems: "center", bgcolor: "#f8fafc" }}
          >
            <Typography color="text.secondary">Preview Workspace</Typography>
          </Paper>
        </Paper>

        <Paper variant="outlined" sx={{ width: { xs: "100%", xl: 340 }, p: 2.5 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Verification
          </Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            <TextField label="Document Number" value="D548291002" />
            <TextField label="Expiration Date" value="Dec 12, 2025" />
            <TextField label="Class" value="A" />
            <TextField label="Internal Notes" multiline minRows={4} placeholder="Review notes..." />
            <Button variant="contained" startIcon={<CheckIcon />}>
              Approve
            </Button>
            <Button variant="outlined" color="warning" startIcon={<InfoOutlinedIcon />}>
              Needs Info
            </Button>
            <Button variant="outlined" color="error" startIcon={<CloseIcon />}>
              Reject
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
