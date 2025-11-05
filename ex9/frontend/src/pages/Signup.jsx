import { useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) return alert("Please fill name, email and password.");
    try {
      await axios.post(`${API_BASE}/auth/signup`, { name, email, password, role });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Error creating account.";
      alert(msg);
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center mt-5 px-3"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
      <input
        type="text"
        placeholder="Full Name"
        className="form-control form-control-lg mb-3 shadow-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        className="form-control form-control-lg mb-3 shadow-sm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="form-select form-select-lg mb-4 shadow-sm"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        className="btn btn-success w-100 py-2 fw-semibold shadow-sm"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}
