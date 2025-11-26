// src/constants/staticData.ts
export const PRIORITIES = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const TASK_STATUS = [
  { label: "To Do", value: "to_do" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
];

// Demo seed data (will be used to populate localStorage on first run)
export const DEMO_PROJECTS = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Revamp marketing website",
    owner_id: "u_admin",
    due_date: "2025-12-31",
  },
  {
    id: "p2",
    name: "Mobile App",
    description: "Build iOS/Android app",
    owner_id: "u_admin",
    due_date: "2026-03-31",
  },
];

export const DEMO_TASKS = [
  {
    id: "t1",
    project_id: "p1",
    title: "Create homepage mockups",
    description: "Wireframes & hi-fi mockups",
    status: "in_progress",
    priority: "high",
    due_date: "2025-11-30",
    assigned_to: "u_member",
  },
  {
    id: "t2",
    project_id: "p1",
    title: "Implement hero section",
    description: "React + MUI implementation",
    status: "to_do",
    priority: "medium",
    due_date: "2025-12-05",
    assigned_to: "u_member",
  },
  {
    id: "t3",
    project_id: "p2",
    title: "Define app navigation",
    description: "UX flow and screens list",
    status: "to_do",
    priority: "low",
    due_date: null,
    assigned_to: "u_admin",
  },
];

export const DEMO_USERS = [
  { id: "u_admin", name: "Admin User", email: "admin@example.com", password: "password" },
  { id: "u_member", name: "Jane Dev", email: "jane@example.com", password: "password" },
];
