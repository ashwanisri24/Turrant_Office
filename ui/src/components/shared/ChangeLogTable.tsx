import {
  Box,
  Button,
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
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useState } from "react";

export type ChangeLogRow = {
  timestamp: string;
  admin: string;
  action: string;
  field: string;
  oldValue: string;
  newValue: string;
  ipDevice: string;
};

type ChangeLogTableProps = {
  rows: ChangeLogRow[];
};

const ACTION_COLORS: Record<string, { bg: string; color: string }> = {
  "Role Updated": { bg: "rgba(59,130,246,0.12)", color: "#2563eb" },
  "Status Changed": { bg: "rgba(34,197,94,0.12)", color: "#15803d" },
  "Field Updated": { bg: "rgba(249,115,22,0.12)", color: "#c2410c" },
  "Document Uploaded": { bg: "rgba(139,92,246,0.12)", color: "#6d28d9" },
  "Permission Changed": { bg: "rgba(59,130,246,0.12)", color: "#2563eb" },
  "Account Created": { bg: "rgba(34,197,94,0.12)", color: "#15803d" }
};

function getActionStyle(action: string) {
  return ACTION_COLORS[action] ?? { bg: "rgba(100,116,139,0.12)", color: "#334155" };
}

function exportToCSV(rows: ChangeLogRow[]) {
  const headers = ["Timestamp", "Admin", "Action", "Field", "Old Value", "New Value", "IP/Device"];
  const csvRows = [
    headers.join(","),
    ...rows.map((r) =>
      [r.timestamp, r.admin, r.action, r.field, r.oldValue, r.newValue, r.ipDevice]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    )
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "change_log.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function ChangeLogTable({ rows }: ChangeLogTableProps) {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = rows.filter((r) => {
    const matchSearch =
      !search ||
      r.admin.toLowerCase().includes(search.toLowerCase()) ||
      r.action.toLowerCase().includes(search.toLowerCase()) ||
      r.field.toLowerCase().includes(search.toLowerCase());
    const matchFrom = !fromDate || r.timestamp >= fromDate;
    const matchTo = !toDate || r.timestamp <= toDate + " 23:59:59";
    return matchSearch && matchFrom && matchTo;
  });

  return (
    <Stack spacing={1.5}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={1.25}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search logs by admin, action, or field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          size="small"
          type="date"
          label="From"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 160 }}
        />
        <TextField
          size="small"
          type="date"
          label="To"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 160 }}
        />
        <Button
          variant="outlined"
          sx={{ minWidth: 44, px: 1.25 }}
          onClick={() => exportToCSV(filtered)}
          title="Download CSV"
        >
          <DownloadRoundedIcon fontSize="small" />
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>TIMESTAMP</TableCell>
              <TableCell>ADMIN</TableCell>
              <TableCell>ACTION</TableCell>
              <TableCell>FIELD</TableCell>
              <TableCell>OLD VALUE</TableCell>
              <TableCell>NEW VALUE</TableCell>
              <TableCell>IP/DEVICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No log entries found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((log, idx) => {
                const style = getActionStyle(log.action);
                return (
                  <TableRow key={`${log.timestamp}-${idx}`} hover>
                    <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>{log.timestamp}</TableCell>
                    <TableCell>{log.admin}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 1,
                          py: 0.375,
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          bgcolor: style.bg,
                          color: style.color
                        }}
                      >
                        {log.action}
                      </Box>
                    </TableCell>
                    <TableCell>{log.field}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{log.oldValue}</TableCell>
                    <TableCell sx={{ color: "#15803d", fontWeight: 700 }}>{log.newValue}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{log.ipDevice}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 2, py: 1.25, borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {filtered.length} of {rows.length} logs
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" disabled>
              Previous
            </Button>
            <Button size="small" variant="contained" disabled>
              Next
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
