import { Button, Snackbar, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef, useState } from "react";

type ImportExportToolbarProps = {
  entityName: string;
  onImport?: (file: File) => void;
  onExport: () => void;
};

export function ImportExportToolbar({ entityName, onImport, onExport }: ImportExportToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.trim().split("\n").filter((l) => l.trim().length > 0);
      const dataRowCount = Math.max(0, lines.length - 1);
      setSnackbar(`Imported ${dataRowCount} ${entityName} record${dataRowCount !== 1 ? "s" : ""} from CSV.`);
      if (onImport) onImport(file);
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" size="small" startIcon={<UploadFileIcon />} onClick={handleImportClick}>
          Import CSV
        </Button>
        <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={onExport}>
          Export CSV
        </Button>
      </Stack>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
