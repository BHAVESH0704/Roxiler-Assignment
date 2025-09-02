// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.status === 200) {
        const { accessToken, user } = response.data;

        // Save JWT and role in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userName", user.name);

        // Redirect based on role
        switch (user.role) {
          case "USER":
            navigate("/stores");
            break;
          case "STORE_OWNER":
            navigate("/owner-dashboard");
            break;
          case "ADMIN":
            navigate("/admin-dashboard"); // optional, create later
            break;
          default:
            navigate("/stores");
        }
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "350px",
          padding: "30px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#2196F3", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
