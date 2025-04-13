import React, { useState } from "react";
import "./Ambulance.css";
import loaction from "../assets/location-green.svg";
const HospList = () => {
  const hospitals = [
    {
      id: 1,
      name: "City Care Hospital",
      location: "Downtown",
      contact: "123-456-7890",
      availability: "Available",
    },
    {
      id: 2,
      name: "Green Valley Clinic",
      location: "Uptown",
      contact: "987-654-3210",
      availability: "Busy",
    },
    {
      id: 3,
      name: "Sunrise Health Center",
      location: "Midtown",
      contact: "555-444-3333",
      availability: "Available",
    },
    {
        id: 1,
        name: "City Care Hospital",
        location: "Downtown",
        contact: "123-456-7890",
        availability: "Available",
      },
      {
        id: 2,
        name: "Green Valley Clinic",
        location: "Uptown",
        contact: "987-654-3210",
        availability: "Busy",
      },
      {
        id: 3,
        name: "Sunrise Health Center",
        location: "Midtown",
        contact: "555-444-3333",
        availability: "Available",
      },
  ];
  const [popUp,setPopUp] = useState(0);
  const handlePopup = () => {
    setPopUp(1);
  };

  const handlePopupClose = () => {
    setPopUp(0);
  };
  return (
    <div className="hospList">
      <div className="card">
        {/* Status */}
        <div className="status-bar">
          <div className="left">
            <h3>Hospitals</h3>
            <p className="status-sub">List of Hospitals that can be reached:</p>
          </div>
        </div>

        <div className="hosplist-container" >
          {hospitals.map((hospital) => (
            <div className="hosp-details" key={hospital.id} onClick={handlePopup}>
              <div className="left">
                <h4>{hospital.name}</h4>

                <p>
                  <strong>Contact:</strong> {hospital.contact}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      hospital.availability === "Available"
                        ? "status-green"
                        : "status-red"
                    }
                  >
                    {hospital.availability}
                  </span>
                </p>
              </div>
              <div className="right">
                <img src={loaction} alt="" className="location"/>
              </div>
            </div>
          ))}
        </div>
        {popUp == 1 ? (
          <div className="popup" >
            <div className="summaryOf-container">
              <div className="title">
                <h4>Add current condition...</h4>
                <div className="cross" onClick={handlePopupClose}>
                  x
                </div>
              </div>
              <div className="text-ar">
                <textarea placeholder="Enter Current Condition.."></textarea>
              </div>
              <div className="btn">
                <button>
                send
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HospList;
