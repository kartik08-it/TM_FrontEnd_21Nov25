export const API_BASE = "http://localhost:8000/api";

export const AUTH_ROUTES = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  REFRESH: `${API_BASE}/auth/refresh`,
  ME: `${API_BASE}/auth/me`,
  LOGOUT: `${API_BASE}/auth/logout`,
};

export const PROJECT_ROUTES = {
  LIST: `${API_BASE}/projects`,
  DETAILS: (id: string | number) => `${API_BASE}/projects/${id}`,
};

export const TASK_ROUTES = {
  LIST: `${API_BASE}/tasks`,
  DETAILS: (id: string | number) => `${API_BASE}/tasks/${id}`,
};
