// src/pages/auth/Login.tsx
import { useState } from "react";
import { TextField } from "@mui/material";
import { mockAuthenticate } from "../../services/mockApi";
import { setAuthState } from "../../context/AuthStore";
import { useNavigate } from "react-router-dom";
import Button from "../../component/ui/Button";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await mockAuthenticate(form.email, form.password);
      setAuthState({ accessToken: res.access_token, refreshToken: res.refresh_token, user: res.user });
      nav("/");
    } catch (e: any) {
      alert(e.message || "Login failed");
    }
  };

  return (
    <div style={{ width: 350, margin: "100px auto" }}>
      <h2>Login (mock)</h2>
      <TextField label="Email" fullWidth sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <TextField label="Password" type="password" fullWidth sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
