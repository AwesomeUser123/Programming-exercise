import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null);
    setSuccess(null);
  };

  const isOnlyWhitespace = (str) => !str || str.trim().length === 0;

  const handleClick = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = inputs;

    if (isOnlyWhitespace(username)) {
      return setErr("Username cannot be empty or just spaces.");
    }

    if (isOnlyWhitespace(password)) {
      return setErr("Password cannot be empty or just spaces.");
    }

    if (password.length < 6) {
      return setErr("Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return setErr("Passwords do not match.");
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", {
        username: username.trim(),
        password: password.trim(),
      });
      setSuccess("Registration successful! You can now log in.");
      setInputs({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      setErr(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Create Account</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
            {err && <div className="error">{err}</div>}
            {success && <div className="success">{success}</div>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
