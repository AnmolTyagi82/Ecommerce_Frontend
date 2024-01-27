import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { username: name, email: email, password: password };
    try {
      let res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        let response = await res.json();
        console.log(response);
        navigate("/login");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-form-parent">
      <div className="auth-form-container">
        <h2>Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="auth-labels">
            Full name
          </label>

          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="full Name"
            className="auth-input"
          />

          <label htmlFor="email" className="auth-labels">
            Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            className="auth-input"
          />

          <label htmlFor="password" className="auth-labels">
            Password
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <Link to="/login">
          <button className="link-btn auth-button">
            Already have an account? Login here.
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
