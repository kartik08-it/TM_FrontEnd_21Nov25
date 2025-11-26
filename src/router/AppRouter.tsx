import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProjectList from "../pages/projects/ProjectList";
import ProjectDetails from "../pages/projects/ProjectDetails";
import TaskBoard from "../pages/tasks/TaskBoard";
import { getAuthState } from "../context/AuthStore";
import AppShell from "../component/layout/AppShell";
import Register from "../pages/auth/Register";
import type { JSX } from "react";
import ProfilePage from "../pages/profile/Profile";

const Protected = ({ children }: { children: JSX.Element }) => {
  const auth = getAuthState();
  if (!auth.accessToken) return <Navigate to="/login" replace />;
  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <Protected>
              <AppShell />
            </Protected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
