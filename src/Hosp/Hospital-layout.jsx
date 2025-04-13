import React, { useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { TbWaveSawTool } from "react-icons/tb";
import { MdPersonOutline } from "react-icons/md";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";
import { BsPercent } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import Map from "./Map";
import "./Hospital.css";

const alertData = [
  {
    id: "P-24052",
    severity: "moderate",
    heartRate: "95 BPM",
    spo2: "92%",
    symptoms: "Fever, cough, fatigue",
    dateTime: "Apr 9, 2025 10:15 AM",
    contact: "(555) 987-6543",
  },
  {
    id: "P-11111",
    severity: "critical",
    heartRate: "120 BPM",
    spo2: "85%",
    symptoms: "Chest pain, short breath",
    dateTime: "Apr 10, 2025 09:00 AM",
    contact: "(555) 123-4567",
  },
  {
    id: "P-22334",
    severity: "low",
    heartRate: "80 BPM",
    spo2: "98%",
    symptoms: "Headache",
    dateTime: "Apr 8, 2025 02:45 PM",
    contact: "(555) 999-8888",
  },
];

const severityOrder = { critical: 1, moderate: 2, low: 3 };

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const sortedAlerts = [...alertData].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );
  const [popUp, setPopUp] = useState(0);
  const handlePopup = () => {
    setPopUp(1);
  };

  const handlePopupClose = () => {
    setPopUp(0);
  };

  const [respondedAlerts,setRespondedAlerts] = useState([]);
  const handleRespond = (id) => {
    if (!respondedAlerts.includes(id)) {
      setRespondedAlerts((prev) => [...prev, id]);
    }
  };
  return (
    <div className="hospital-main-pg">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h2>
            Rescu<span className="logo-back">X</span>
          </h2>
        </div>
      </nav>

      <main>
        <div className="slider-container">
          <div className="container">
            <p>Active Emergencies</p>
            <div className="bottom">
              <div className="count">
                <h3>3</h3>
              </div>
              <div className="icon">
                <p>
                  <TbWaveSawTool />
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <p>Monitored Emergencies</p>
            <div className="bottom">
              <div className="count">
                <h3>30</h3>
              </div>
              <div className="icon">
                <p className="blue">
                  <MdPersonOutline />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="condition-conatiner">
          <h3 className="critical-title">Critical Alerts</h3>
          {sortedAlerts.map((alert, index) => (
            <div
              key={index}
              className={`alert-card-container border-${alert.severity}`}
            >
              <div className="alert-card">
                <div className="card-header">
                  <div className="patient-id">
                    <IoPerson /> Patient ID: <strong>{alert.id}</strong>
                  </div>
                  <div className="severity">
                    {alert.severity === "critical"
                      ? "🔴 Critical"
                      : alert.severity === "moderate"
                      ? "🟠 Moderate"
                      : "🟢 Low"}
                  </div>
                </div>

                <div className="vitals">
                  <div className="heart-rate">
                    <FaHeart className="icon red" />
                    <span>
                      <strong>{alert.heartRate}</strong>
                      <div className="label">Heart Rate</div>
                    </span>
                  </div>
                  <div className="spo2">
                    <BsPercent className="icon blue" />
                    <span>
                      <strong>{alert.spo2}</strong>
                      <div className="label">SpO₂</div>
                    </span>
                  </div>
                </div>

                <div className="symptoms">
                  <label>Symptoms</label>
                  <span className="sym">
                    <div>{alert.symptoms}</div>
                    <div className="view" onClick={handlePopup}>
                      view
                    </div>
                  </span>
                </div>

                <div className="time-contact">
                  <div className="time">
                    <FiClock /> <span>{alert.dateTime}</span>
                  </div>
                  <div className="contact">
                    <FaPhoneAlt /> <span>{alert.contact}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    className={`respond-btn ${
                      respondedAlerts.includes(alert.id) ? "responded" : ""
                    }`}
                    onClick={() => handleRespond(alert.id)}
                  >
                    ✔ Mark as Responded
                  </button>

                  <button className="map-btn" onClick={() => navigate("map")}>
                    📍 View on Map
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {popUp == 1 ? (
          <div className="popup" onClick={handlePopupClose}>
            <div className="summaryOf-container">
              <div className="title">
                <h3>Summary</h3>
                <div className="cross" onClick={handlePopupClose}>
                  x
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

const HospitalLayout = () => {
  return (
    <Routes>
      <Route index element={<HospitalDashboard />} />
      <Route path="map" element={<Map />} />
    </Routes>
  );
};

export default HospitalLayout;
