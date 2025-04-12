import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const handleLogin = ()=>{
    Navigate('/client/sos')
  }
  const handleSignUp =()=>{
    Navigate('/signup')
  }
  return (
    <div className="signin-container">
      <h1 className="signin-title">Login</h1>
      <p className="signin-subtitle">Let’s experience the joy of telecare AI</p>

      <div className="form">
        <label>Email Address</label>
        <div className="input-box">
          <span className="input-icon">📧</span>
          <input type="email" placeholder="Harinn1604@gmail.com" />
        </div>

        <label>Password</label>
        <div className="input-box">
          <span className="input-icon">🔒</span>
          <input type="password" placeholder="Enter your password..." />
          <span className="eye-icon">👁️</span> {/* Replace with actual icon if needed */}
        </div>

        <button className="signin-btn" onClick={handleLogin}>
          Login <span className="arrow">→</span>
        </button>

        <div className="links">
          <p>
            Don’t have an account? <span className="signup" onClick={handleSignUp}>Sign Up.</span>
          </p>
          <p className="forgot">Forgot your password?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
