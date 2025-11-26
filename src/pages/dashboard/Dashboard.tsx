
import { Grid, Box, Typography, Button, Chip, Divider, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import TaskIcon from "@mui/icons-material/Task";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  mockGetProjects,
  mockGetTasks,
} from "../../services/mockApi";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setProjects(await mockGetProjects());
      setTasks(await mockGetTasks());
    })();
  }, []);

  const stats = {
    totalProjects: projects.length,
    totalTasks: tasks.length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "done").length,
  };

  const recentTasks = tasks.slice(0, 4);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard
      </Typography>

      {/* === Overview Cards === */}
      <Grid container spacing={3}>
        <Grid>
          <Card>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WorkIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h6">{stats.totalProjects}</Typography>
                <Typography color="text.secondary">Total Projects</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid >
          <Card>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TaskIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h6">{stats.totalTasks}</Typography>
                <Typography color="text.secondary">Total Tasks</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid >
          <Card>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AutorenewIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h6">{stats.inProgress}</Typography>
                <Typography color="text.secondary">In Progress</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid >
          <Card>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h6">{stats.completed}</Typography>
                <Typography color="text.secondary">Completed</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* === Quick Actions === */}
      <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Quick Actions
        </Typography>
      </Box>

      <Grid container columns={12} spacing={3}>
        <Grid>
          <Card sx={{ textAlign: "center", p: 4 }}>
            <Button variant="contained" startIcon={<AddIcon />} size="large">
              Create New Task
            </Button>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ textAlign: "center", p: 4 }}>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} size="large">
              Create New Project
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* === Recent Tasks === */}
      <Box sx={{ mt: 5, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Recent Tasks
        </Typography>
      </Box>

      <Card>
        {recentTasks.length === 0 && (
          <Typography>No tasks available</Typography>
        )}

        {recentTasks.map((task) => (
          <Box key={task.id} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Chip
              label={task.status.replace("_", " ").toUpperCase()}
              color={
                task.status === "done"
                  ? "success"
                  : task.status === "in_progress"
                  ? "warning"
                  : "default"
              }
              size="small"
            />
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Card>

      {/* === Activity Timeline === */}
      <Box sx={{ mt: 5, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Recent Activity
        </Typography>
      </Box>

      <Card>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TimelineIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Task "Homepage Mockups" moved to Review</Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TimelineIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Project "Mobile App" updated</Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TimelineIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Task "Navigation UX" created</Typography>
        </Box>
      </Card>
    </Box>
  );
}
