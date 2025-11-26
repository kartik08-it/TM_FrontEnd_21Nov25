// src/components/layout/Sidebar.tsx

import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// icons (optional but recommended)
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", to: "/", icon: <DashboardIcon /> },
    { label: "Projects", to: "/projects", icon: <FolderIcon /> },
    { label: "Tasks", to: "/tasks", icon: <TaskIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 220,
        height: "100vh",
        borderRight: 1,
        borderColor: theme.palette.divider,
        background: theme.palette.mode === "dark"
          ? theme.palette.background.paper
          : "#f5f8ff",
        p: 2,
      }}
    >
      <List>
        {menu.map((item) => {
          const active = location.pathname === item.to;

          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              sx={{
                borderRadius: 1,
                mb: 1,
                background: active
                  ? theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(25, 118, 210, 0.15)"
                  : "transparent",
                color: active
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                "&:hover": {
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(25, 118, 210, 0.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: active
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
