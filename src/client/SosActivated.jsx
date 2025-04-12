import React, { useEffect, useState } from "react";
import profile from "../assets/profile.svg";
import location from "../assets/location.svg";
import call from "../assets/call.svg";
import locationgreen from "../assets/location-green.svg";
import map from "../assets/map.svg";
import heart from "../assets/heart.svg";
import truck from "../assets/truck.svg";
const SosActived = () => {
  const [minsLeft, setMinsLeft] = useState(10);

  useEffect(() => {
    if (minsLeft > 0) {
      const timer = setTimeout(() => setMinsLeft((prev) => prev - 1), 60000);
      return () => clearTimeout(timer);
    }
  }, [minsLeft]);

  const ratioWidth = (minsLeft / 10) * 100;
  return (
    <div className="sos-activated-main">
      <header>
        <div className="profile">
          <img src={profile} alt="profile" />
          <h3>John</h3>
        </div>
        <div className="loc">
          <p>See Location</p>
          <img src={location} alt="" />
        </div>
      </header>
      <div className="sos-pg">
        <h2>Emergency SOS</h2>
        <div className="sos-act">
          <img src={call} alt="" />
          <h4>SOS Activated</h4>
        </div>
        <div className="location">
          <div className="loc-header">
            <div className="loc-header-left">
              <img src={locationgreen} alt="" />
              <h3>Your Location</h3>
            </div>
            <div className="live">
              <div className="red-dot"></div>
              <p>Live</p>
            </div>
          </div>
          <div className="loc-img">
            <img src={map} alt="" />
          </div>
        </div>
        <div className="health-data">
          <header>
            <img src={heart} alt="" />
            <div className="content">
              <h3>Health Data</h3>
              <p>Connect Device to get health data</p>
            </div>
          </header>
          <div className="container">
            <div className="heart-rate">
              <p>Heart Rate</p>
              <h3>96 bpm</h3>
            </div>
            <div className="bp">
              <p>Heart Rate</p>
              <h3>96 bpm</h3>
            </div>
            <div className="o2">
              <p>Heart Rate</p>
              <h3>96 bpm</h3>
            </div>
            <div className="bodytemp">
              <p>Heart Rate</p>
              <h3>96 bpm</h3>
            </div>
          </div>
        </div>
        <div className="ambulance-status">
          <div className="ambulance-status-header">
            <div className="ambulance-status-header-left">
              <img src={truck} alt="" />
              <div className="ambulance-status-header-left-content">
                <h3>Ambulance Status</h3>
                <p>Estimated arrival: {minsLeft} minutes</p>
              </div>
            </div>
            <div className="route">
              <p>Route</p>
            </div>
          </div>
          <div className="ratio-box">
            <div
              className="ratio-fill"
              style={{
                width: `${(minsLeft / 10) * 100}%`,
                backgroundColor:
                  minsLeft > 7 ? "green" : minsLeft > 4 ? "orange" : "red",
              }}
            ></div>
          </div>
        </div>
        <div className="hosp-status">
          
        </div>
      </div>
    </div>
  );
};

export default SosActived;
