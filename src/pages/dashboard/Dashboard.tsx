import {
  Grid,
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import TaskIcon from "@mui/icons-material/Task";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useState, useEffect } from "react";
import { mockGetProjects, mockGetTasks } from "../../services/mockApi";

// Additional mock data for enhanced features
const mockGetTeamMembers = async () => [
  {
    id: 1,
    name: "Sarah Martinez",
    tasks: 8,
    points: 34,
    initials: "SM",
    color: "#667eea",
  },
  {
    id: 2,
    name: "Mike Chen",
    tasks: 5,
    points: 21,
    initials: "MC",
    color: "#f093fb",
  },
  {
    id: 3,
    name: "Alex Johnson",
    tasks: 6,
    points: 28,
    initials: "AJ",
    color: "#4facfe",
  },
  {
    id: 4,
    name: "Emma Brown",
    tasks: 4,
    points: 18,
    initials: "EB",
    color: "#fa709a",
  },
];

export default function Dashboard() {
  const [teamSize, setTeamSize] = useState<string>("small");
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setProjects(await mockGetProjects());
      setTasks(await mockGetTasks());
      setTeamMembers(await mockGetTeamMembers());
    })();
  }, []);

  const stats = {
    totalProjects: projects.length,
    totalTasks: tasks.length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "done").length,
    overdue: tasks.filter((t) => t.status === "overdue" || t.status === "todo")
      .length,
  };

  const velocity = [70, 85, 75, 90, 95];
  const overdueTasks = tasks.filter((t) => t.status === "todo").slice(0, 2);
  const recentActivity = tasks.slice(0, 3);

  const getStatusColor = (
    status: string
  ): "default" | "success" | "info" | "error" | "warning" => {
    switch (status) {
      case "done":
        return "success";
      case "in_progress":
        return "info";
      case "overdue":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#172b4d" }}>
          📊 Task Management Dashboard
        </Typography>
      </Box>

      {/* Stats Cards - Always Visible */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid>
          <Card
            sx={{
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <WorkIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#0052cc" }}
                  >
                    {stats.totalProjects}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Projects
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card
            sx={{
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TaskIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#0052cc" }}
                  >
                    {stats.totalTasks}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Tasks
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card
            sx={{
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AutorenewIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#0052cc" }}
                  >
                    {stats.inProgress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Progress
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card
            sx={{
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#0052cc" }}
                  >
                    {stats.completed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sprint Progress & Velocity */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid>
          <Card sx={{ boxShadow: 2, height: "100%" }}>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Sprint Progress
                </Typography>
                <Chip label="Sprint 24" size="small" />
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#0052cc", mb: 1 }}
              >
                68%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={68}
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid>
                  <Box
                    sx={{
                      bgcolor: "#f4f5f7",
                      p: 1.5,
                      borderRadius: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#0052cc" }}
                    >
                      24
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid>
                  <Box
                    sx={{
                      bgcolor: "#f4f5f7",
                      p: 1.5,
                      borderRadius: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#0052cc" }}
                    >
                      11
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Remaining
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ boxShadow: 2, height: "100%" }}>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Team Velocity
                </Typography>
                <TrendingUpIcon color="success" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 1,
                  height: 150,
                }}
              >
                {velocity.map((val, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      flex: 1,
                      height: `${val}%`,
                      background: "linear-gradient(to top, #0052cc, #4c9aff)",
                      borderRadius: "4px 4px 0 0",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      pb: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.65rem",
                      }}
                    >
                      S{20 + idx}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ boxShadow: 2, height: "100%" }}>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  ⚠️ Priority Tasks
                </Typography>
                <Chip
                  label={`${stats.overdue} Items`}
                  color="warning"
                  size="small"
                />
              </Box>
              <Box>
                {overdueTasks.map((task) => (
                  <Box
                    key={task.id}
                    sx={{
                      p: 1.5,
                      mb: 1,
                      bgcolor: "#fff5f5",
                      borderLeft: "3px solid #ff5630",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                      {task.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Typography variant="caption" color="text.secondary">
                        Priority
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Team Workload & Recent Activity */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Team Workload
              </Typography>
              {teamMembers.map((member) => (
                <Box
                  key={member.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    mb: 1,
                    bgcolor: "#f4f5f7",
                    borderRadius: 1,
                  }}
                >
                  <Avatar sx={{ bgcolor: member.color, width: 40, height: 40 }}>
                    {member.initials}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {member.tasks} tasks • {member.points} story points
                    </Typography>
                  </Box>
                  <Chip label="Active" color="info" size="small" />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Activity
              </Typography>
              {recentActivity.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    p: 1.5,
                    mb: 1,
                    bgcolor: "#f4f5f7",
                    borderRadius: 1,
                    borderLeft: "3px solid #0052cc",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {task.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Chip
                      label={task.status.replace("_", " ").toUpperCase()}
                      color={getStatusColor(task.status)}
                      size="small"
                      sx={{ height: 20 }}
                    />
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Medium Team Content */}
      <>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Work Distribution
                </Typography>
                <Grid container spacing={2}>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#e3fcef",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#006644" }}
                      >
                        18
                      </Typography>
                      <Typography variant="caption">Features</Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#ffebe6",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#bf2600" }}
                      >
                        7
                      </Typography>
                      <Typography variant="caption">Bugs</Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#deebff",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#0052cc" }}
                      >
                        5
                      </Typography>
                      <Typography variant="caption">Tasks</Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#eae6ff",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#5243aa" }}
                      >
                        3
                      </Typography>
                      <Typography variant="caption">Improvements</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🚧 Blocked Items
                  </Typography>
                  <Chip label="2" color="error" size="small" />
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    mb: 1,
                    bgcolor: "#ffebe6",
                    borderLeft: "3px solid #ff5630",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Deploy to production
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Blocked by: Security review
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "#fff3e0",
                    borderLeft: "3px solid #ffab00",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Integration testing
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Blocked by: API endpoint
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Burndown Chart
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                    height: 150,
                  }}
                >
                  {[100, 85, 70, 50, 30].map((val, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        flex: 1,
                        height: `${val}%`,
                        background: "linear-gradient(to top, #ff5630, #ff8f73)",
                        borderRadius: "4px 4px 0 0",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        pb: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.65rem",
                        }}
                      >
                        D{(idx + 1) * 2}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
      {/* Large Team Content */}
      <>
        <Grid container spacing={3}>
          <Grid>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Portfolio Roadmap
                </Typography>
                {projects.slice(0, 3).map((project) => (
                  <Box key={project.id} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {project.name || `Project ${project.id}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {Math.floor(Math.random() * 40 + 60)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.floor(Math.random() * 40 + 60)}
                      sx={{ height: 8, borderRadius: 4, mb: 0.5 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Team {project.id}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Executive Summary
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: "#0052cc", mb: 1 }}
                >
                  147
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Total Active Projects
                </Typography>
                <Grid container spacing={2}>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#e3fcef",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#006644" }}
                      >
                        89
                      </Typography>
                      <Typography variant="caption">On Track</Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#fff3e0",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#ff8b00" }}
                      >
                        42
                      </Typography>
                      <Typography variant="caption">At Risk</Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#ffebe6",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#bf2600" }}
                      >
                        16
                      </Typography>
                      <Typography variant="caption">Delayed</Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      sx={{
                        bgcolor: "#deebff",
                        p: 2,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "#0052cc" }}
                      >
                        324
                      </Typography>
                      <Typography variant="caption">Team Members</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>

      {/* Quick Actions - Floating Buttons */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          gap: 2,
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            boxShadow: 4,
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Create Task
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          sx={{
            boxShadow: 4,
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Create Project
        </Button>
      </Box>
    </Box>
  );
}
