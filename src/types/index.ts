export type User = {
  id: number;
  name: string;
  email: string;
};

export type Project = {
  id: number;
  name: string;
  description?: string;
  owner_id?: number;
  due_date?: string | null;
};

export type Task = {
  id: number;
  project_id?: number | null;
  title: string;
  description?: string;
  status: string;
  priority: string;
  due_date?: string | null;
  assigned_to?: number | null;
};
