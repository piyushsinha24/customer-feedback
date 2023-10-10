import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Navbar(props) {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div className="nav-header">BT Customer Feedback</div>
      <div className="nav-buttons-group">
        {props.showAdmin && (
          <button
            onClick={() => navigate("/admin/register")}
            className="nav-button"
          >
            Admin
          </button>
        )}
        {props.showHome && (
          <button onClick={() => navigate("/")} className="nav-button">
            Home
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
