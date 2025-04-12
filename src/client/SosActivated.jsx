import React from "react";
import profile from "../assets/profile.svg";
import location from "../assets/location.svg";
import call from "../assets/call.svg";
import locationgreen from "../assets/location-green.svg";
import map from "../assets/map.svg";
import heart from "../assets/heart.svg"

const SosActived = () => {
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
        <div className="ambulance"></div>
      </div>
    </div>
  );
};

export default SosActived;
