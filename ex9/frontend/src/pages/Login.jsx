import { useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      const token = res.data.token;
      const role = res.data.user?.role || res.data.role; // support both shapes
      const name = res.data.user?.name || null;
      localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      if (name) localStorage.setItem("name", name);
      navigate(role === "admin" ? "/admin" : "/user");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center mt-5 px-3"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-center mb-4 fw-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="form-control form-control-lg mb-3 shadow-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control form-control-lg mb-4 shadow-sm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100 py-2 fw-semibold shadow-sm" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
