import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import "./styles.css";
import { feedbackSchema, validate } from "../../utils/validation";
import { submitFeedback } from "../../services/feedbackService";

function Feedback() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiNotification, setApiNotification] = useState({});

  const onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setApiNotification({});
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setApiNotification({});

    const isValid = await validate({
      schema: feedbackSchema,
      formData,
      setErrors,
    });
    if (!isValid) {
      return;
    }
    setIsLoading(true);

    const { data, error } = await submitFeedback(formData);

    if (data) {
      setApiNotification({
        status: "success",
        message: "Feedback submitted successfully!",
      });
      setFormData({});
    } else if (error) {
      setApiNotification({
        status: "failed",
        message: "Something went wrong! Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="feedback-container">
      <Navbar showDashboard={true} />
      <form className="feedback-form" onSubmit={onFormSubmit}>
        <p className="feedback-title">We'd love some feedback!</p>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          aria-label="Name"
          value={formData.name ?? ""}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {errors["name"] && <p className="feedback-error">{errors["name"]}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          aria-label="Email"
          value={formData.email ?? ""}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {errors["email"] && <p className="feedback-error">{errors["email"]}</p>}
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          aria-label="Company"
          value={formData.company ?? ""}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {errors["company"] && (
          <p className="feedback-error">{errors["company"]}</p>
        )}
        <label htmlFor="comments">Comments</label>
        <textarea
          rows={5}
          id="comments"
          name="comments"
          aria-label="Comments"
          value={formData.comments ?? ""}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {errors["comments"] && (
          <p className="feedback-error">{errors["comments"]}</p>
        )}
        <button
          className="submit-button"
          disabled={isLoading}
          type="submit"
          aria-label="Submit"
        >
          Submit
        </button>
        {apiNotification.status === "success" && (
          <p className="feedback-success">{apiNotification.message}</p>
        )}
        {apiNotification.status === "failed" && (
          <p className="feedback-error">{apiNotification.message}</p>
        )}
      </form>
    </div>
  );
}

export default Feedback;
