import {
  Alert,
  Box,
  Button,
  IconButton,
  MenuItem,
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
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DriverActiveStatusField,
  DriverEmailField,
  DriverFullNameField,
  DriverLicenseExpiryField,
  DriverLicenseNumberField,
  DriverOtpStatusField,
  DriverPhoneField
} from "../../components/forms/driver-fields";
import { DateRangeFields } from "../../components/shared/DateRangeFields";

type DriverFormViewProps = {
  mode: "create" | "edit";
};

type OwnerRow = {
  id: number;
  owner: string;
  startDate: string;
  endDate: string;
};

const OWNER_OPTIONS = [
  "Speedy Delivery Inc.",
  "Logistics Prime LLC",
  "GreenLine Logistics",
  "TransMove Cargo",
  "North Ridge Transport"
];

export function DriverFormView({ mode }: DriverFormViewProps) {
  const navigate = useNavigate();
  const isCreate = mode === "create";
  const [aadhaar, setAadhaar] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerRows, setOwnerRows] = useState<OwnerRow[]>([
    { id: 1, owner: "", startDate: "", endDate: "" }
  ]);
  const nextId = ownerRows.length > 0 ? Math.max(...ownerRows.map((r) => r.id)) + 1 : 1;

  const isDuplicate =
    aadhaar === "1234-5678-9012" && licenseNumber.toLowerCase().includes("dl-");

  const handleAddOwner = () => {
    setOwnerRows((prev) => [...prev, { id: nextId, owner: "", startDate: "", endDate: "" }]);
  };

  const handleRemoveOwner = (id: number) => {
    setOwnerRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOwnerChange = (id: number, field: keyof OwnerRow, value: string) => {
    setOwnerRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4">Add / Edit Driver</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage driver profile details, licensing, and assignments.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" onClick={() => navigate("/drivers")}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<SaveIcon />}>
            {isCreate ? "Save Driver" : "Save Changes"}
          </Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={1.5}>
        <Stack spacing={2} sx={{ width: { xs: "100%", lg: 320 } }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2">Driver Photo</Typography>
            <Box
              sx={{
                mt: 2,
                width: 160,
                height: 160,
                borderRadius: "50%",
                bgcolor: "#f3f4f6",
                mx: "auto"
              }}
            />
            <Button fullWidth sx={{ mt: 2 }} variant="outlined">
              Upload Photo
            </Button>
          </Paper>
          <DriverActiveStatusField />
          <DriverOtpStatusField />
        </Stack>

        <Stack spacing={2} sx={{ flex: 1 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Personal Information
            </Typography>
            <Stack spacing={2}>
              <DriverFullNameField />
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <DriverPhoneField />
                <DriverEmailField />
              </Stack>
              <TextField
                fullWidth
                size="small"
                label="Aadhaar Number"
                placeholder="XXXX-XXXX-XXXX"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                helperText="Format: 1234-5678-9012 — stored masked"
                inputProps={{ maxLength: 14 }}
              />
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Licensing & Engagement
            </Typography>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="License Number"
                  placeholder="e.g. DL-12345678"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
                <DriverLicenseExpiryField />
              </Stack>
              <TextField
                fullWidth
                select
                size="small"
                label="License Type"
                defaultValue=""
              >
                <MenuItem value="">Select license type</MenuItem>
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="truck">Truck</MenuItem>
                <MenuItem value="heavy-goods">Heavy Goods</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </TextField>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Engagement Period
                </Typography>
                <DateRangeFields startLabel="Engagement Start Date" endLabel="Engagement End Date" />
              </Box>

              {isDuplicate ? (
                <Alert
                  severity="warning"
                  icon={<WarningAmberIcon />}
                  sx={{ borderRadius: 1 }}
                >
                  <Typography variant="body2" fontWeight={700}>
                    Possible Duplicate Detected
                  </Typography>
                  <Typography variant="body2">
                    A driver with this Aadhaar + License combination already exists under{" "}
                    <strong>Speedy Delivery Inc.</strong>.{" "}
                    <Button
                      variant="text"
                      size="small"
                      sx={{ p: 0, minWidth: 0, color: "warning.dark", textDecoration: "underline" }}
                      onClick={() => navigate("/drivers/DRV-8921")}
                    >
                      Click to view existing record.
                    </Button>
                  </Typography>
                </Alert>
              ) : null}
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
              <Typography variant="h6">Owner Assignments</Typography>
              <Button size="small" startIcon={<AddIcon />} onClick={handleAddOwner}>
                Add Another Owner
              </Button>
            </Stack>
            <Paper variant="outlined" sx={{ overflow: "hidden" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Fleet Owner</TableCell>
                    <TableCell>Assignment Start</TableCell>
                    <TableCell>Assignment End</TableCell>
                    <TableCell align="right">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ownerRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ minWidth: 200 }}>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          value={row.owner}
                          onChange={(e) => handleOwnerChange(row.id, "owner", e.target.value)}
                          placeholder="Select owner"
                        >
                          <MenuItem value="">Select owner</MenuItem>
                          {OWNER_OPTIONS.map((o) => (
                            <MenuItem key={o} value={o}>
                              {o}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        <TextField
                          fullWidth
                          size="small"
                          type="date"
                          value={row.startDate}
                          onChange={(e) => handleOwnerChange(row.id, "startDate", e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        <TextField
                          fullWidth
                          size="small"
                          type="date"
                          value={row.endDate}
                          onChange={(e) => handleOwnerChange(row.id, "endDate", e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveOwner(row.id)}
                          disabled={ownerRows.length === 1}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
}
