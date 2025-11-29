import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell() {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* FIXED SIDEBAR */}
      <Box sx={{ width: 220, flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* MAIN AREA */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>

        {/* FIXED NAVBAR */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Navbar />
        </Box>

        {/* SCROLLABLE CONTENT AREA (FULL WIDTH!) */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 3,
            maxWidth: "100%",
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
}
