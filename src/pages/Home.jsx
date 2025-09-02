import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect logged-in users
    if (user) {
      if (user.role === "USER") navigate("/my-ratings");
      else if (user.role === "STORE_OWNER") navigate("/owner-dashboard");
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Welcome to Store Ratings App!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>
        Rate your favorite stores and explore new ones.
      </p>

      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "15px 30px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Next
      </button>

      <p style={{ fontSize: "0.9rem" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#2196F3", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Home;
