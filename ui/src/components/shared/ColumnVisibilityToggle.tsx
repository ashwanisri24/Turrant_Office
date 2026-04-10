import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Popover,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { useState } from "react";

export type ColDef = {
  key: string;
  label: string;
};

type ColumnVisibilityToggleProps = {
  columns: ColDef[];
  visible: string[];
  onChange: (cols: string[]) => void;
};

export function ColumnVisibilityToggle({ columns, visible, onChange }: ColumnVisibilityToggleProps) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const handleToggle = (key: string) => {
    if (visible.includes(key)) {
      if (visible.length > 1) {
        onChange(visible.filter((k) => k !== key));
      }
    } else {
      onChange([...visible, key]);
    }
  };

  return (
    <>
      <Tooltip title="Show/hide columns">
        <IconButton
          size="small"
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, px: 0.75, py: 0.75 }}
        >
          <ViewColumnIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Paper sx={{ p: 1.5, minWidth: 200 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, px: 1 }}>
            COLUMNS
          </Typography>
          <Box sx={{ mt: 0.75 }}>
            {columns.map((col) => (
              <Stack key={col.key} direction="row" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={visible.includes(col.key)}
                      onChange={() => handleToggle(col.key)}
                    />
                  }
                  label={<Typography variant="body2">{col.label}</Typography>}
                  sx={{ width: "100%", mx: 0 }}
                />
              </Stack>
            ))}
          </Box>
        </Paper>
      </Popover>
    </>
  );
}
