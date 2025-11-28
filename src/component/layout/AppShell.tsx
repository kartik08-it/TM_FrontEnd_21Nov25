import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          ml: { md: "240px", xs: 0 }, 
        }}
      >
        {/* Fixed Navbar */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: { md: "240px", xs: 0 },
            right: 0,
            height: 64,
            zIndex: 2000,
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Navbar />
        </Box>

        <Box
          sx={{
            mt: "64px",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            p: { xs: 2, md: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
