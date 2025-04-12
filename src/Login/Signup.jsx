import React, { useState } from "react";
import "./Login.css";
import { IoPerson } from "react-icons/io5";
import { FaTruckMedical } from "react-icons/fa6";
import { BsFillHospitalFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const Navigate = useNavigate();

  const handleLogin = ()=>{
    Navigate('/login')
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Let’s experience the joy of telecare AI.</p>

        <form>
          <label>Name</label>
          <div className="input-field">
            <input type="text" placeholder="Enter your name" />
          </div>

          <label>Email Address</label>
          <div className="input-field">
            <input type="email" placeholder="Enter your email" />
          </div>

          <label>Password</label>
          <div className="input-field">
            <input type="password" placeholder="Enter your password" />
          </div>

          <label>Confirm Password</label>
          <div className="input-field">
            <input type="password" placeholder="Confirm your password" />
          </div>

          <label>Phone No</label>
          <div className="input-field">
            <input type="text" placeholder="Enter your phone No" />
          </div>

          <label>Role</label>
          <div className="role-container">
            <div
              className={`role-box ${selectedRole === "patient" ? "selected" : ""}`}
              onClick={() => handleRoleClick("patient")}
            >
              <IoPerson size={24} />
            </div>
            <div
              className={`role-box ${selectedRole === "hospital" ? "selected" : ""}`}
              onClick={() => handleRoleClick("hospital")}
            >
              <BsFillHospitalFill size={24} />
            </div>
            <div
              className={`role-box ${selectedRole === "ambulance" ? "selected" : ""}`}
              onClick={() => handleRoleClick("ambulance")}
            >
              <FaTruckMedical size={24} />
            </div>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up →
          </button>
        </form>

        <p className="alt-option">
          Already have an account? <span className="signin-link" onClick={handleLogin}>Login.</span>
        </p>
        <p className="forgot-link">Forgot your password?</p>
      </div>
    </div>
  );
};

export default Signup;
