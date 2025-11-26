import { Box, List, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box sx={{ width: 200, background: "#f4f4f4", p: 2 }}>
      <List>
        <ListItemButton component={Link} to="/">Dashboard</ListItemButton>
        <ListItemButton component={Link} to="/projects">Projects</ListItemButton>
        <ListItemButton component={Link} to="/tasks">Tasks</ListItemButton>
      </List>
    </Box>
  );
}
