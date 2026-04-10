import type { ReactNode } from "react";
import { Avatar, Box, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useLocation, useNavigate } from "react-router-dom";

export const SIDEBAR_WIDTH = 240;

type NavItem = {
  label: string;
  icon: ReactNode;
  to?: string;
  matchPrefix?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", icon: <DashboardOutlinedIcon fontSize="small" />, to: "/home" }]
  },
  {
    title: "Operations",
    items: [
      { label: "Rides", icon: <DirectionsCarFilledOutlinedIcon fontSize="small" />, to: "/rides", matchPrefix: "/rides" },
      { label: "Passengers", icon: <PersonOutlinedIcon fontSize="small" />, to: "/passengers", matchPrefix: "/passengers" },
      { label: "Blacklist", icon: <BlockOutlinedIcon fontSize="small" />, to: "/blacklist", matchPrefix: "/blacklist" },
      { label: "Support", icon: <SupportAgentOutlinedIcon fontSize="small" />, to: "/support", matchPrefix: "/support" },
      {
        label: "Reporting and Analysis",
        icon: <QueryStatsOutlinedIcon fontSize="small" />,
        to: "/reporting-analysis",
        matchPrefix: "/reporting-analysis"
      }
    ]
  },
  {
    title: "Configurations",
    items: [
      { label: "Users", icon: <GroupOutlinedIcon fontSize="small" />, to: "/users", matchPrefix: "/users" },
      {
        label: "Roles & Permissions",
        icon: <AdminPanelSettingsOutlinedIcon fontSize="small" />,
        to: "/configurations/roles-permissions",
        matchPrefix: "/configurations/roles-permissions"
      },
      {
        label: "Fleet Owners",
        icon: <DomainOutlinedIcon fontSize="small" />,
        to: "/fleet-owners",
        matchPrefix: "/fleet-owners"
      },
      {
        label: "Vehicles",
        icon: <LocalShippingOutlinedIcon fontSize="small" />,
        to: "/vehicles",
        matchPrefix: "/vehicles"
      },
      {
        label: "Drivers",
        icon: <BadgeOutlinedIcon fontSize="small" />,
        to: "/drivers",
        matchPrefix: "/drivers"
      },
      {
        label: "Verification Center",
        icon: <AssignmentIndOutlinedIcon fontSize="small" />,
        to: "/assignments/verification-center",
        matchPrefix: "/assignments"
      },
      {
        label: "Platform Config",
        icon: <SettingsOutlinedIcon fontSize="small" />,
        to: "/configurations/platform-config",
        matchPrefix: "/configurations/platform-config"
      }
    ]
  }
];

export function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isItemActive = (item: NavItem): boolean => {
    if (!item.to) {
      return false;
    }
    if (location.pathname === item.to) {
      return true;
    }
    if (item.matchPrefix) {
      return location.pathname.startsWith(`${item.matchPrefix}/`);
    }
    return location.pathname.startsWith(`${item.to}/`);
  };

  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(15, 23, 42, 0.08)",
        bgcolor: "#ffffff",
        overflow: "hidden"
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <Stack spacing={3}>
          {NAV_GROUPS.map((group) => (
            <Box key={group.title}>
              <Typography
                variant="caption"
                sx={{
                  px: 1.5,
                  mb: 1,
                  display: "block",
                  color: "text.disabled",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700
                }}
              >
                {group.title}
              </Typography>
              <List disablePadding>
                {group.items.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <ListItemButton
                      key={item.label}
                      selected={active}
                      onClick={item.to ? () => navigate(item.to as string) : undefined}
                      sx={{
                        mb: 0.5,
                        borderRadius: 2,
                        color: active ? "#14532d" : "text.secondary",
                        "&.Mui-selected": { bgcolor: "rgba(128, 236, 19, 0.12)" },
                        "&.Mui-selected:hover": { bgcolor: "rgba(128, 236, 19, 0.16)" },
                        "&:hover": { bgcolor: "#f7f8f6", color: "text.primary" }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: active ? 600 : 500
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid rgba(15, 23, 42, 0.08)" }}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Admin User
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Super Admin
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
