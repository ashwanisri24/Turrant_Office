import { Box, Typography } from "@mui/material";

type StatusTone = {
  bg: string;
  border: string;
  text: string;
  dot: string;
};

const TONES: Record<string, StatusTone> = {
  active: { bg: "#ecfdf3", border: "#bbf7d0", text: "#166534", dot: "#22c55e" },
  verified: { bg: "#ecfdf3", border: "#bbf7d0", text: "#166534", dot: "#22c55e" },
  online: { bg: "#ecfdf3", border: "#bbf7d0", text: "#166534", dot: "#22c55e" },

  pending: { bg: "#fffbeb", border: "#fde68a", text: "#92400e", dot: "#f59e0b" },
  review: { bg: "#fffbeb", border: "#fde68a", text: "#92400e", dot: "#f59e0b" },
  "needs review": { bg: "#fffbeb", border: "#fde68a", text: "#92400e", dot: "#f59e0b" },
  scheduled: { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8", dot: "#3b82f6" },
  "needs info": { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8", dot: "#3b82f6" },

  inactive: { bg: "#f8fafc", border: "#e2e8f0", text: "#475569", dot: "#94a3b8" },
  offline: { bg: "#f8fafc", border: "#e2e8f0", text: "#475569", dot: "#94a3b8" },
  ended: { bg: "#f8fafc", border: "#e2e8f0", text: "#475569", dot: "#94a3b8" },
  missing: { bg: "#f8fafc", border: "#e2e8f0", text: "#475569", dot: "#94a3b8" },
  "out of service": { bg: "#f8fafc", border: "#e2e8f0", text: "#475569", dot: "#94a3b8" },

  rejected: { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c", dot: "#ef4444" },
  flagged: { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c", dot: "#ef4444" },
  critical: { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c", dot: "#ef4444" },

  warning: { bg: "#fffbeb", border: "#fde68a", text: "#92400e", dot: "#f59e0b" },
  info: { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8", dot: "#3b82f6" }
};

const DEFAULT_TONE: StatusTone = {
  bg: "#f8fafc",
  border: "#e2e8f0",
  text: "#334155",
  dot: "#94a3b8"
};

type StatusBadgeProps = {
  label: string;
  showDot?: boolean;
};

export function StatusBadge({ label, showDot = true }: StatusBadgeProps) {
  const tone = TONES[label.toLowerCase()] ?? DEFAULT_TONE;

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.25,
        py: 0.375,
        borderRadius: 999,
        border: "1px solid",
        borderColor: tone.border,
        bgcolor: tone.bg
      }}
    >
      {showDot ? <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: tone.dot }} /> : null}
      <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1, color: tone.text }}>{label}</Typography>
    </Box>
  );
}
