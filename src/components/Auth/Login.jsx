import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.scss";
import AuthContext from "../../utils/Context";
const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email);
  // };
  return (
    <div className="auth-form-parent">
      <div className="auth-form-container">
        <h2>Login</h2>

        <form className="login-form" onSubmit={loginUser}>
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>

        <Link to="/register">
          <button className="link-btn auth-button">
            Don't have an account? Register here.
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
