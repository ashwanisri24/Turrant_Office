import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { HeaderBar, HEADER_HEIGHT } from "./header-bar";
import { LeftSidebar, SIDEBAR_WIDTH } from "./left-sidebar";

type MainLayoutProps = {
  children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box minHeight="100vh" bgcolor="#f7f8fb">
      <HeaderBar />

      <Box display="flex" pt={`${HEADER_HEIGHT}px`} minHeight="100vh">
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            position: "fixed",
            top: `${HEADER_HEIGHT}px`,
            left: 0,
            bottom: 0
          }}
        >
          <LeftSidebar />
        </Box>

        <Box component="main" sx={{ flex: 1, ml: `${SIDEBAR_WIDTH}px`, p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
