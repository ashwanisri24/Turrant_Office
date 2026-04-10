import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const KPI_CARDS = [
  { label: "Total Rides", value: "128,432", delta: "+14.2%" },
  { label: "Platform Commission", value: "$42,910.00", delta: "+8.5%" },
  { label: "Active Fleets", value: "1,204", delta: "Stable since last month" },
  { label: "New Drivers", value: "452", delta: "-2.1%" }
];

const REGIONAL_ROWS = [
  { city: "Mumbai Central", drivers: "1,240", rides: "4,892", eta: "3.2 mins", contribution: "$12,400", health: "#22c55e" },
  { city: "New Delhi - NCR", drivers: "2,105", rides: "7,421", eta: "5.8 mins", contribution: "$19,820", health: "#22c55e" },
  { city: "Bangalore IT Park", drivers: "940", rides: "3,120", eta: "4.1 mins", contribution: "$8,150", health: "#f59e0b" },
  { city: "Hyderabad Gachibowli", drivers: "650", rides: "1,940", eta: "2.9 mins", contribution: "$4,200", health: "#22c55e" },
  { city: "Pune South", drivers: "312", rides: "820", eta: "7.4 mins", contribution: "$1,900", health: "#ef4444" }
];

const REVENUE_SPLIT = [
  { label: "Economy Class", value: "$24,500 (57%)", width: 57, color: "#65d10f" },
  { label: "Luxury Fleets", value: "$12,100 (28%)", width: 28, color: "#9fe25f" },
  { label: "Inter-City", value: "$6,300 (15%)", width: 15, color: "#bde992" }
];

export function ReportingAnalyticsView() {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={1.5}>
        <Box>
          <Typography variant="h4">Reporting & Analysis</Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive view of platform performance and operational metrics across all regions.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="success" startIcon={<DownloadRoundedIcon />}>
            Export PDF
          </Button>
          <Button variant="outlined">CSV</Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.25}>
        {KPI_CARDS.map((kpi) => (
          <Paper key={kpi.label} variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {kpi.label}
            </Typography>
            <Typography variant="h4" sx={{ fontSize: 34, fontWeight: 700, mt: 0.4 }}>
              {kpi.value}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: kpi.delta.startsWith("+") ? "#16a34a" : kpi.delta.startsWith("-") ? "#ef4444" : "text.secondary",
                fontWeight: 700
              }}
            >
              {kpi.delta}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <Paper variant="outlined" sx={{ p: 2, flex: 1.7 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Monthly Ride Growth</Typography>
            <Typography variant="caption" color="text.secondary">
              Current • Previous
            </Typography>
          </Stack>
          <Box sx={{ width: "100%", height: 220 }}>
            <svg width="100%" height="100%" viewBox="0 0 600 220" preserveAspectRatio="none">
              <path d="M0,190 C60,150 90,210 140,170 C180,140 220,40 280,150 C330,205 380,35 430,20 C470,12 500,220 560,130 C575,100 590,70 600,40" fill="none" stroke="#65d10f" strokeWidth="4" />
              <path d="M0,195 C60,170 90,190 140,180 C180,160 220,95 280,170 C330,200 380,95 430,80 C470,75 500,205 560,165 C575,155 590,130 600,95" fill="none" stroke="#cbd5e1" strokeWidth="3" />
            </svg>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, width: { lg: 280 } }}>
          <Typography variant="h6">Trip Status Breakdown</Typography>
          <Stack alignItems="center" justifyContent="center" sx={{ py: 2 }}>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                background:
                  "conic-gradient(#65d10f 0% 62%, #94a3b8 62% 82%, #e2e8f0 82% 100%)",
                display: "grid",
                placeItems: "center"
              }}
            >
              <Box sx={{ width: 108, height: 108, borderRadius: "50%", bgcolor: "#fff", display: "grid", placeItems: "center" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    92%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Success
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption">Completed 11.6K</Typography>
            <Typography variant="caption">Canceled 2.1K</Typography>
            <Typography variant="caption">Failed 1.0K</Typography>
          </Stack>
        </Paper>
      </Stack>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
          <Typography variant="h6">Key Operational Metrics by Region</Typography>
          <Button size="small">View Detailed Region Report</Button>
        </Stack>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>City / Region</TableCell>
              <TableCell>Active Drivers</TableCell>
              <TableCell>Rides (24h)</TableCell>
              <TableCell>Avg. ETA</TableCell>
              <TableCell>Rev. Contribution</TableCell>
              <TableCell align="right">Health</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {REGIONAL_ROWS.map((row) => (
              <TableRow key={row.city} hover>
                <TableCell sx={{ fontWeight: 700 }}>{row.city}</TableCell>
                <TableCell>{row.drivers}</TableCell>
                <TableCell>{row.rides}</TableCell>
                <TableCell>{row.eta}</TableCell>
                <TableCell>{row.contribution}</TableCell>
                <TableCell align="right">
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: row.health, ml: "auto" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.25, borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}>
          <Typography variant="caption" color="text.secondary">
            Showing 5 of 12 active regions
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ‹ ›
          </Typography>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">Revenue Distribution by Category</Typography>
        <Stack spacing={1.5} sx={{ mt: 1.5 }}>
          {REVENUE_SPLIT.map((item) => (
            <Box key={item.label}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  {item.label}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  {item.value}
                </Typography>
              </Stack>
              <Box sx={{ mt: 0.5, height: 7, borderRadius: 999, bgcolor: "#e2e8f0", overflow: "hidden" }}>
                <Box sx={{ width: `${item.width}%`, height: "100%", bgcolor: item.color }} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
