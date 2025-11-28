import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Dashboard", to: "/", icon: <DashboardIcon /> },
    { label: "Projects", to: "/projects", icon: <FolderIcon /> },
    { label: "Tasks", to: "/tasks", icon: <TaskIcon /> },
  ];

  const SidebarContent = (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        overflowY: "auto",
        borderRight: 1,
        borderColor: theme.palette.divider,
        background:
          theme.palette.mode === "dark"
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
              onClick={() => isMobile && setOpen(false)} // close drawer on mobile
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

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 2000,
            bgcolor: "white",
            boxShadow: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Desktop Sticky Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: 240,
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            overflowY: "auto",
            borderRight: 1,
            borderColor: theme.palette.divider,
            background:
              theme.palette.mode === "dark"
                ? theme.palette.background.paper
                : "#f5f8ff",
            p: 2,
            zIndex: 1200,
          }}
        >
          {SidebarContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        {SidebarContent}
      </Drawer>
    </>
  );
}
