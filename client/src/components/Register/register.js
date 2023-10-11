import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import "./styles.css";
import { registerSchema, validate } from "../../utils/validation";
import { register } from "../../services/auth/registerService";
import { AdminContext } from "../../App";

function Register() {
  const { setAdmin } = useContext(AdminContext);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiNotification, setApiNotification] = useState({});
  const navigate = useNavigate();

  const onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setApiNotification({});
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setApiNotification({});

    const isValid = await validate({
      schema: registerSchema,
      formData,
      setErrors,
    });
    if (!isValid) {
      return;
    }
    setIsLoading(true);

    const { data, error } = await register(formData);

    if (data) {
      const adminInfo = {
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        token: data.token
      };

      setApiNotification({
        status: "success",
        message: "Admin registered successfully!",
      });

      setTimeout(() => {
        setAdmin({ ...adminInfo });
        navigate("/admin/dashboard");
      }, 800);

      setFormData({});
    } else if (error) {
      setApiNotification(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="register-container">
      <Navbar showHome={true} showLogin={true}/>
      <form className="register-form" onSubmit={onFormSubmit}>
        <p className="register-title">Register as an Admin!</p>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          aria-label="First Name"
          value={formData.firstName ?? ""}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {errors["firstName"] && (
          <p className="feedback-error">{errors["firstName"]}</p>
        )}
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          aria-label="Last Name"
          value={formData.lastName ?? ""}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {errors["lastName"] && (
          <p className="feedback-error">{errors["lastName"]}</p>
        )}
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-label="Password"
          value={formData.password ?? ""}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {errors["password"] && (
          <p className="feedback-error">{errors["password"]}</p>
        )}
        <button
          className="submit-button"
          disabled={isLoading}
          type="submit"
          aria-label="Register"
        >
          Register
        </button>
        {apiNotification.status === "success" && (
          <p className="register-success">{apiNotification.message}</p>
        )}
        {apiNotification.status === "failed" && (
          <p className="register-error">{apiNotification.message}</p>
        )}
      </form>
    </div>
  );
}

export default Register;
