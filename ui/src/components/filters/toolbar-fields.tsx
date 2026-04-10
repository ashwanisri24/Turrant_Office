import {
  InputAdornment,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type FilterOption = {
  value: string;
  label: string;
};

type ToolbarSearchFieldProps = {
  label: string;
  placeholder: string;
  fullWidth?: boolean;
};

export function ToolbarSearchField({ label, placeholder, fullWidth }: ToolbarSearchFieldProps) {
  return (
    <Stack spacing={0.75} sx={{ minWidth: 240, flex: fullWidth ? 1 : undefined }}>
      <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
        {label}
      </Typography>
      <TextField
        size="small"
        fullWidth={fullWidth}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          )
        }}
      />
    </Stack>
  );
}

type ToolbarFilterFieldProps = {
  label: string;
  placeholder: string;
  options: FilterOption[];
  minWidth?: number;
};

export function ToolbarFilterField({ label, placeholder, options, minWidth = 170 }: ToolbarFilterFieldProps) {
  return (
    <Stack spacing={0.75} sx={{ minWidth }}>
      <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
        {label}
      </Typography>
      <TextField select size="small" defaultValue="">
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

type ToolbarIconActionButtonProps = {
  title: string;
  icon: React.ReactNode;
};

export function ToolbarIconActionButton({ title, icon }: ToolbarIconActionButtonProps) {
  return (
    <Tooltip title={title}>
      <IconButton
        size="small"
        sx={{
          border: "1px solid",
          borderColor: "#d9e1ce",
          borderRadius: 1.5,
          bgcolor: "#fff",
          "&:hover": { bgcolor: "#f7f8f6" }
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
