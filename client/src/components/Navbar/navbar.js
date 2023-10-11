import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.setAdmin && props.setAdmin({});
    navigate("/admin/login");
  };

  return (
    <div className="nav">
      <div className="nav-header">Customer Feedback</div>
      <div className="nav-buttons-group">
        {props.showHome && (
          <button onClick={() => navigate("/")} className="nav-button">
            Home
          </button>
        )}
        {props.showLogin && (
          <button
            onClick={() => navigate("/admin/login")}
            className="nav-button"
          >
            Login
          </button>
        )}
        {props.showLogout && (
          <button onClick={handleLogout} className="nav-button">
            Logout
          </button>
        )}
        {props.showRegister && (
          <button
            onClick={() => navigate("/admin/register")}
            className="nav-button"
          >
            Register
          </button>
        )}
        {props.showDashboard && (
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="nav-button"
          >
            Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
