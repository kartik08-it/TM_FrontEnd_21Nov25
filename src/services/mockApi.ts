// src/services/mockApi.ts
import { DEMO_PROJECTS, DEMO_TASKS, DEMO_USERS } from "../constants/staticData";
import { v4 as uuidv4 } from "uuid";

const LS_KEYS = {
  PROJECTS: "tm_projects_v1",
  TASKS: "tm_tasks_v1",
  USERS: "tm_users_v1",
};

function firstRunSeed() {
  if (!localStorage.getItem(LS_KEYS.PROJECTS)) {
    localStorage.setItem(LS_KEYS.PROJECTS, JSON.stringify(DEMO_PROJECTS));
  }
  if (!localStorage.getItem(LS_KEYS.TASKS)) {
    localStorage.setItem(LS_KEYS.TASKS, JSON.stringify(DEMO_TASKS));
  }
  if (!localStorage.getItem(LS_KEYS.USERS)) {
    localStorage.setItem(LS_KEYS.USERS, JSON.stringify(DEMO_USERS));
  }
}
firstRunSeed();

/* helpers */
const read = (key: string) => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

/* Projects */
export const mockGetProjects = async () => {
  return read(LS_KEYS.PROJECTS);
};
export const mockGetProject = async (id: string) => {
  return read(LS_KEYS.PROJECTS).find((p: any) => p.id === id);
};
export const mockCreateProject = async (payload: any) => {
  const projects = read(LS_KEYS.PROJECTS);
  const newP = { ...payload, id: payload.id || uuidv4() };
  projects.unshift(newP);
  write(LS_KEYS.PROJECTS, projects);
  return newP;
};
export const mockUpdateProject = async (id: string, payload: any) => {
  const projects = read(LS_KEYS.PROJECTS).map((p: any) => (p.id === id ? { ...p, ...payload } : p));
  write(LS_KEYS.PROJECTS, projects);
  return projects.find((p: any) => p.id === id);
};
export const mockDeleteProject = async (id: string) => {
  const projects = read(LS_KEYS.PROJECTS).filter((p: any) => p.id !== id);
  write(LS_KEYS.PROJECTS, projects);
  // also remove tasks of that project
  const tasks = read(LS_KEYS.TASKS).filter((t: any) => t.project_id !== id);
  write(LS_KEYS.TASKS, tasks);
  return true;
};

// append to src/services/mockApi.ts (or add if missing)
export const mockGetCurrentUser = async () => {
  const auth = JSON.parse(localStorage.getItem("tm_auth_v1") || "null");
  if (!auth?.user) return null;
  const users = JSON.parse(localStorage.getItem("tm_users_v1") || "[]");
  return users.find((u: any) => u.id === auth.user.id) || auth.user;
};

export const mockUpdateUser = async (id: string, payload: any) => {
  const users = JSON.parse(localStorage.getItem("tm_users_v1") || "[]");
  const next = users.map((u: any) => (u.id === id ? { ...u, ...payload } : u));
  localStorage.setItem("tm_users_v1", JSON.stringify(next));
  // if current auth user updated, sync auth storage
  const auth = JSON.parse(localStorage.getItem("tm_auth_v1") || "null");
  if (auth?.user?.id === id) {
    auth.user = { ...auth.user, ...payload };
    localStorage.setItem("tm_auth_v1", JSON.stringify(auth));
  }
  return next.find((u: any) => u.id === id);
};


/* Tasks */
export const mockGetTasks = async (projectId?: string) => {
  const tasks = read(LS_KEYS.TASKS);
  return projectId ? tasks.filter((t: any) => t.project_id === projectId) : tasks;
};
export const mockGetTask = async (id: string) => {
  return read(LS_KEYS.TASKS).find((t: any) => t.id === id);
};
export const mockCreateTask = async (payload: any) => {
  const tasks = read(LS_KEYS.TASKS);
  const newT = { ...payload, id: payload.id || uuidv4() };
  tasks.unshift(newT);
  write(LS_KEYS.TASKS, tasks);
  return newT;
};
export const mockUpdateTask = async (id: string, payload: any) => {
  const tasks = read(LS_KEYS.TASKS).map((t: any) => (t.id === id ? { ...t, ...payload } : t));
  write(LS_KEYS.TASKS, tasks);
  return tasks.find((t: any) => t.id === id);
};
export const mockDeleteTask = async (id: string) => {
  const tasks = read(LS_KEYS.TASKS).filter((t: any) => t.id !== id);
  write(LS_KEYS.TASKS, tasks);
  return true;
};

/* Users (mock auth) */
export const mockFindUserByEmail = (email: string) => {
  return read(LS_KEYS.USERS).find((u: any) => u.email === email);
};
export const mockCreateUser = async (payload: any) => {
  const users = read(LS_KEYS.USERS);
  // basic duplicate check
  if (users.find((u: any) => u.email === payload.email)) {
    throw new Error("Email already exists");
  }
  const newU = { id: uuidv4(), ...payload };
  users.push(newU);
  write(LS_KEYS.USERS, users);
  return newU;
};
export const mockAuthenticate = async (email: string, password: string) => {
  const u = read(LS_KEYS.USERS).find((usr: any) => usr.email === email && usr.password === password);
  if (!u) throw new Error("Invalid credentials");
  // return a fake token pair
  return {
    access_token: "mock_access_" + u.id,
    refresh_token: "mock_refresh_" + u.id,
    user: { id: u.id, name: u.name, email: u.email },
  };

  
};
