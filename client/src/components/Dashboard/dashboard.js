import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../App";
import { getAllFeedback } from "../../services/feedbackService";
import Navbar from "../Navbar/navbar";
import "./styles.css";

function Dashboard() {
  const { admin, setAdmin } = useContext(AdminContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiNotification, setApiNotification] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { data, error } = await getAllFeedback(admin.token);
      if (data) {
        setFeedbacks(data.feedbacks);
      } else if (error) {
        setApiNotification({
          status: "failed",
          message: "Something went wrong! Please try again.",
        });
      }
      setRefresh(false);
      setIsLoading(false);
    }
    fetchData();
  }, [refresh, admin.token]);

  const handleRefresh = () => {
    setRefresh(true);
  }

  const renderFeedbacks = () => {
    return (
      <div className="card-container">
        {feedbacks.map((feedback, i) => (
          <div key={i} className="card">
            <div>{feedback.name}</div>
            <div>{feedback.email}</div>
            <div>works at {feedback.company}</div>
            <p className="comment">"{feedback.comments}"</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Navbar showHome={true} showLogout={true} setAdmin={setAdmin} />
      <p className="dashboard-title">
        Hello {admin.firstName}! Here's what customers say about us:
      </p>
      {isLoading && <div className="loader"></div>}
      <button
          className="submit-button"
          disabled={isLoading}
          type="button"
          aria-label="Refresh"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      {feedbacks && feedbacks.length > 0 && renderFeedbacks()}
      {apiNotification.status === "failed" && (
        <p className="dashboard-error">{apiNotification.message}</p>
      )}
    </div>
  );
}

export default Dashboard;
