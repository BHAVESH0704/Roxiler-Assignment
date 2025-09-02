// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // go up one folder
import { useAuth } from "../context/AuthContext"; // go up one folder

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("USER"); // default role
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !address || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await api.post("/auth/register", { name, email, password, address, role });

      if (response.status === 201 || response.status === 200) {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Registration failed, try again.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="USER">Customer</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              background: "#4CAF50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              flex: 1,
              marginLeft: "10px",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              background: "#2196F3",
              color: "white",
              cursor: "pointer",
            }}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
