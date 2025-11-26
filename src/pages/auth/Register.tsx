// src/pages/auth/Register.tsx
import { useState } from "react";
import { TextField } from "@mui/material";
import { mockCreateUser, mockAuthenticate } from "../../services/mockApi";
import { setAuthState } from "../../context/AuthStore";
import { useNavigate } from "react-router-dom";
import Button from "../../component/ui/Button";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleRegister = async () => {
    if (form.password !== form.password_confirmation) {
      alert("Password confirmation does not match");
      return;
    }
    try {
      await mockCreateUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // auto-login
      const res = await mockAuthenticate(form.email, form.password);
      setAuthState({
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
        user: res.user,
      });
      nav("/");
    } catch (e: any) {
      alert(e.message || "Registration failed");
    }
  };

  return (
    <div style={{ width: 400, margin: "80px auto" }}>
      <h2>Register (mock)</h2>
      <TextField
        label="Full Name"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        sx={{ mb: 3 }}
        onChange={(e) =>
          setForm({ ...form, password_confirmation: e.target.value })
        }
      />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}
