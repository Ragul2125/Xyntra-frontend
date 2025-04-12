import React from "react";
import "./Login.css";
import ambulance from "../assets/ambulance.png"; // make sure image is available
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const Navigate = useNavigate();
  const handleLogin = ()=>{
    Navigate('/login')
  }
  const handleSignup =()=>{
    Navigate('/signup')
  }
  return (
    <div className="welcome-container">
      <h1 className="title">Welcome to the RescuX</h1>
      <p className="subtitle">Your intelligent lab report analyst. 🧠</p>

      <div className="image-wrapper">
        <img src={ambulance} alt="ambulance" className="ambulance-image" />
      </div>

      <button className="get-started" onClick={handleSignup}>
        Get Started <span className="arrow">→</span>
      </button>

      <p className="signin-text">
        Already have an account? <span className="signin-link" onClick={handleLogin}>Login.</span>
      </p>
    </div>
  );
};

export default GetStarted;
