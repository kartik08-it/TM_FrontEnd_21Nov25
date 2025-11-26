// src/components/layout/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "../../context/ThemeContext";
import { mockGetTasks, mockGetCurrentUser } from "../../services/mockApi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { mode, toggle } = useThemeMode();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const searchRef = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      setUser(await mockGetCurrentUser());
    })();
  }, []);

  // debounced search
  useEffect(() => {
    if (searchRef.current) window.clearTimeout(searchRef.current);
    if (!query) {
      setResults([]);
      return;
    }
    searchRef.current = window.setTimeout(async () => {
      const all = await mockGetTasks();
      const q = query.toLowerCase();
      const rs = all.filter((t: any) => t.title.toLowerCase().includes(q));
      setResults(rs.slice(0, 6));
    }, 240);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // close dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setResults([]);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const onProfileOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const onProfileClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("tm_auth_v1");
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: logo / app name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>TM</Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            TaskManager
          </Typography>
        </Box>

        {/* Center: search */}
        <Box sx={{ flex: 1, mx: 3, maxWidth: 720, position: "relative" }}>
          <Paper
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1,
              py: 0.5,
              width: "100%",
              gap: 1,
            }}
          >
            <SearchIcon color="action" />
            <InputBase
              placeholder="Search tasks by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />
          </Paper>

          {/* search dropdown */}
          {results.length > 0 && (
            <Paper
              ref={dropdownRef}
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                mt: 1,
                zIndex: 30,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
              <List dense>
                {results.map((r) => (
                  <ListItemButton
                    key={r.id}
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      // navigate to project/task detail if exists, fallback to alert
                      navigate(`/tasks`);
                      // optionally store selected id somewhere
                    }}
                  >
                    <ListItemText
                      primary={r.title}
                      secondary={r.project_id ? `Project: ${r.project_id}` : ""}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}
        </Box>

        {/* Right: theme + profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={toggle} size="large" title="Toggle theme">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setOpenMenu(true);
            }}
            size="large"
          >
            <Avatar src={user?.avatar || ""} sx={{ width: 36, height: 36 }}>
              {user?.name?.[0] || "U"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
          >
            <Box sx={{ p: 2, width: 240 }}>
              <Typography sx={{ fontWeight: 700 }}>
                {user?.name || "Your Name"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "email@example.com"}
              </Typography>
            </Box>
            <MenuItem
              onClick={() => {
                onProfileClose();
                navigate("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                onProfileClose();
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
