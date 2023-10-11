import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import "./styles.css";
import { loginSchema, validate } from "../../utils/validation";
import { AdminContext } from "../../App";
import { login } from "../../services/auth/loginService";

function Login() {
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
      schema: loginSchema,
      formData,
      setErrors,
    });
    if (!isValid) {
      return;
    }
    setIsLoading(true);

    const { data, error } = await login(formData);

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
        message: "Admin logged in successfully!",
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
    <div className="login-container">
      <Navbar showHome={true} showRegister={true}/>
      <form className="login-form" onSubmit={onFormSubmit}>
        <p className="login-title">Login as an Admin!</p>
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
          aria-label="Login"
        >
          Login
        </button>
        {apiNotification.status === "success" && (
          <p className="login-success">{apiNotification.message}</p>
        )}
        {apiNotification.status === "failed" && (
          <p className="login-error">{apiNotification.message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
