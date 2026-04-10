import {
  Box,
  Button,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const FEATURE_TOGGLES = [
  {
    title: "Online Payments",
    description: "Enable integrated digital wallet and credit card processing for all active regions.",
    enabled: true
  },
  {
    title: "In-app Chat",
    description: "Allow real-time communication between drivers and passengers during active assignments.",
    enabled: true
  },
  {
    title: "Shared Rides",
    description: "Activate carpooling algorithm for multiple pickups along similar routes.",
    enabled: false
  },
  {
    title: "Driver GPS Enforcement",
    description: "Mandatory high-frequency location pinging. Disables driver if GPS signal is lost for >60s.",
    enabled: true
  }
];

const SERVICE_AREAS = [
  { code: "IN-MH", city: "Mumbai", drivers: "12,482", growth: "+12%" },
  { code: "IN-DL", city: "Delhi", drivers: "18,291", growth: "+4%" },
  { code: "IN-KA", city: "Bangalore", drivers: "9,103", growth: "+22%" }
];

export function PlatformConfigView() {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={1.5}>
        <Box>
          <Typography variant="h4">Platform Configuration</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage global system rules, feature toggles, and operational parameters.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.25}>
          <Button variant="outlined" startIcon={<ManageSearchRoundedIcon />}>
            Audit Logs
          </Button>
          <Button variant="contained" color="success" startIcon={<SaveRoundedIcon />}>
            Save Changes
          </Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <Stack spacing={2} sx={{ flex: 1.8 }}>
          <Paper variant="outlined" sx={{ overflow: "hidden" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <ChecklistRoundedIcon sx={{ color: "#65a30d", fontSize: 19 }} />
                <Typography variant="h6">Feature Toggles</Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
                Global State
              </Typography>
            </Stack>

            {FEATURE_TOGGLES.map((item, idx) => (
              <Stack
                key={item.title}
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{
                  px: 2,
                  py: 2,
                  borderBottom: idx === FEATURE_TOGGLES.length - 1 ? "none" : "1px solid rgba(15, 23, 42, 0.08)"
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35 }}>
                    {item.description}
                  </Typography>
                </Box>
                <Switch checked={item.enabled} color="success" />
              </Stack>
            ))}
          </Paper>

          <Paper variant="outlined" sx={{ overflow: "hidden" }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(15, 23, 42, 0.08)" }}>
              <ChecklistRoundedIcon sx={{ color: "#65a30d", fontSize: 19 }} />
              <Typography variant="h6">Operational Rules</Typography>
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ p: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>
                  Broadcast Radius (KM)
                </Typography>
                <TextField size="small" fullWidth defaultValue="5.5" sx={{ mt: 0.75 }} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: "block" }}>
                  Maximum search radius for available drivers.
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>
                  Acceptance Window (MINS)
                </Typography>
                <TextField size="small" fullWidth defaultValue="3" sx={{ mt: 0.75 }} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: "block" }}>
                  Time allowed for a driver to accept a bid.
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>
                  Max Bids Shown
                </Typography>
                <TextField size="small" fullWidth defaultValue="5" sx={{ mt: 0.75 }} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: "block" }}>
                  Top driver bids visible to the passenger.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>

        <Paper variant="outlined" sx={{ width: { lg: 280 }, p: 1.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 0.5, pb: 1 }}>
            <Typography variant="h6">Service Areas</Typography>
            <Button size="small" variant="outlined" sx={{ minWidth: 0, px: 0.8 }}>
              <AddRoundedIcon fontSize="small" />
            </Button>
          </Stack>
          <Stack spacing={1.25}>
            {SERVICE_AREAS.map((area) => (
              <Paper key={area.code} variant="outlined" sx={{ p: 1.25 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    {area.code}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1,
                      py: 0.25,
                      borderRadius: 999,
                      bgcolor: "rgba(132,204,22,0.15)",
                      color: "#3f6212",
                      fontWeight: 700
                    }}
                  >
                    ACTIVE
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ mt: 1, fontSize: 34, fontWeight: 700 }}>
                  {area.city}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                      Drivers
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>{area.drivers}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", fontWeight: 700 }}>
                      Growth
                    </Typography>
                    <Typography sx={{ color: "#16a34a", fontWeight: 700 }}>{area.growth}</Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Button variant="outlined" fullWidth sx={{ mt: 2 }} startIcon={<AddRoundedIcon />}>
            Add New Service City
          </Button>
        </Paper>
      </Stack>
    </Stack>
  );
}
