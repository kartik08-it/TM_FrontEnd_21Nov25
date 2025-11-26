// src/pages/profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Avatar, Grid, Typography, Paper, Chip } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { mockGetCurrentUser, mockGetTasks, mockUpdateUser } from "../../services/mockApi";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [tasks, setTasks] = useState<any[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const u = await mockGetCurrentUser();
      setUser(u);
      setForm({
        name: u?.name || "",
        email: u?.email || "",
        mobile: u?.mobile || "",
        organization: u?.organization || "",
        role: u?.role || "Member",
        title: u?.title || "",
        about: u?.about || "",
      });

      const all = await mockGetTasks();
      // tasks assigned to this user
      const assigned = all.filter((t: any) => t.assigned_to === u?.id);
      setTasks(assigned);
    })();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    const updated = await mockUpdateUser(user.id, { ...form });
    setUser(updated);
    alert("Profile updated");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((s: any) => ({ ...s, [key]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Profile
      </Typography>

      <Grid container spacing={3} columns={12}>
        <Grid>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <Avatar src={form.profilePic || user.avatar} sx={{ width: 120, height: 120 }}>{user?.name?.[0]}</Avatar>
              <Button variant="contained" component="label">Upload Profile Pic<input hidden accept="image/*" type="file" onChange={(e) => onFileChange(e, "profilePic")} /></Button>
              <Button variant="outlined" component="label">Upload Cover<input hidden accept="image/*" type="file" onChange={(e) => onFileChange(e, "coverPic")} /></Button>
            </Box>
          </Paper>

          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">Currently working on</Typography>
            {tasks.length === 0 && <Typography>No tasks assigned</Typography>}
            {tasks.map((t) => (
              <Box key={t.id} sx={{ mt: 1 }}>
                <Typography variant="subtitle2">{t.title}</Typography>
                <Chip label={t.status} size="small" sx={{ mt: 1 }} />
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "grid", gap: 16 }}>
              <TextField label="Name" fullWidth value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
              <TextField label="Email" fullWidth value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
              <TextField label="Mobile" fullWidth value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} />
              <TextField label="Organization" fullWidth value={form.organization} onChange={(e) => setForm({...form, organization: e.target.value})} />
              <TextField label="Role" fullWidth value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} />
              <TextField label="Title" fullWidth value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
              <TextField label="About me" fullWidth multiline minRows={4} value={form.about} onChange={(e) => setForm({...form, about: e.target.value})} />
            </Box>

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button variant="contained" onClick={handleSave}>Save</Button>
              <Button variant="outlined" onClick={() => nav(-1)}>Cancel</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
