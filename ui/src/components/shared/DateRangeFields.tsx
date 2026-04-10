import { Stack, TextField } from "@mui/material";

type DateRangeFieldsProps = {
  startLabel?: string;
  endLabel?: string;
  startValue?: string;
  endValue?: string;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
};

export function DateRangeFields({
  startLabel = "Start Date",
  endLabel = "End Date",
  startValue,
  endValue,
  onStartChange,
  onEndChange
}: DateRangeFieldsProps) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <TextField
        fullWidth
        size="small"
        type="date"
        label={startLabel}
        value={startValue ?? ""}
        onChange={(e) => onStartChange?.(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        size="small"
        type="date"
        label={endLabel}
        value={endValue ?? ""}
        onChange={(e) => onEndChange?.(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </Stack>
  );
}
