import React, { useState } from "react";
import "./Ambulance.css";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleOpnMap = () => {
    navigate("/ambulance/map");
  };

  const [cases, setCases] = useState([
    {
      id: 1,
      type: "Cardiac Arrest",
      patient: "Sarah Thompson",
      eta: "6 minutes",
      heartRate: "96 bpm",
      bloodPressure: "120/80",
      address: "123, Oak street, Downtown",
    },
    {
      id: 2,
      type: "Accident Injury",
      patient: "Michael Ray",
      eta: "4 minutes",
      heartRate: "102 bpm",
      bloodPressure: "110/75",
      address: "78, Pine Avenue, Uptown",
    },
    {
      id: 3,
      type: "Stroke",
      patient: "Emily Watson",
      eta: "7 minutes",
      heartRate: "89 bpm",
      bloodPressure: "130/85",
      address: "456, Maple Blvd, Midtown",
    },
  ]);

  const handleDecline = (id) => {
    setCases((prevCases) => prevCases.filter((item) => item.id !== id));
  };

  return (
    <div className="screen">
      <div className="card">
        {/* Status */}
        <div className="status-bar">
          <div className="left">
            <p className="status-title">
              Status: <strong>Available</strong>
            </p>
            <p className="status-sub">Vehicle: Ready</p>
          </div>
          <div className="right">
            <FaRegEdit />
          </div>
        </div>

        {cases.map((emergency) => (
          <div className="container" key={emergency.id}>
            {/* Emergency Alert */}
            <div className="alert-bar">
              <p>🚨 New Emergency Alert!</p>
              <small>{emergency.address}</small>
            </div>

            {/* Case Details */}
            <div className="section">
              <div className="section-header">
                <h4>Case Details</h4>
                <span className="priority">High Priority</span>
              </div>
              <p>
                <strong>Emergency Type:</strong> {emergency.type}
              </p>
              <p>
                <strong>Patient Name:</strong> {emergency.patient}
              </p>
              <p>
                <strong>ETA:</strong> {emergency.eta}
              </p>

              <div className="map-placeholder" onClick={handleOpnMap}>
                <span>🗺️</span>
                <p>Map Preview Here</p>
                <button className="navigate-btn">📍 Navigate</button>
              </div>
            </div>

            {/* Vitals */}
            <div className="section">
              <h4>Patient Vitals</h4>
              <div className="vitals">
                <div className="vitals-box">
                  <p className="vital-label">Heart Rate</p>
                  <p className="vital-value">{emergency.heartRate}</p>
                </div>
                <div className="vitals-box">
                  <p className="vital-label">Blood Pressure</p>
                  <p className="vital-value">{emergency.bloodPressure}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="buttons">
              <button className="accept">✅ Accept Case</button>
              <button className="decline" onClick={() => handleDecline(emergency.id)}>
                ✖ Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
