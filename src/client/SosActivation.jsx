import React, { useEffect, useState } from "react";
import profile from "../assets/profile.svg";
import location from "../assets/location.svg";
import warning from "../assets/warning.svg";
import { useNavigate } from "react-router-dom";

const SosActivation = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  const ratioWidth = (secondsLeft / 10) * 100;

  const Navigate = useNavigate()
  const handelCancel = () =>{
    Navigate('/client/sos')
  }
  const handleSend = ()=>{
    Navigate('/client/sos-activated')
  }
  return (
    <div className="sos-activation-main">
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
      <div className="sos-act-content">
        <h2>Emergency SOS</h2>
        <p className="cancel-content">Cancel the alert If its a false call</p>
        <div className="sos-activation-box">
          <div className="sos-activation-box-title">
            <div className="title">
              <h3>Manual Emergency Activated</h3>
            </div>
            <div className="cancel" onClick={handelCancel}>x</div>
          </div>
          <div className="timing">
            <div className="time">
              <p>Alerting emergency services in:</p>

              <h4>{secondsLeft}s</h4>
            </div>

            <div className="ratio-box">
              <div
                className="ratio-fill"
                style={{ width: `${(secondsLeft / 10) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="btns">
            <div className="send" onClick={handleSend}>
              <img src={warning} alt="" />
              <p>Send</p>
            </div>
            <div className="cancel-btn" onClick={handelCancel}>
              <p className="x">x</p>
              <p>cancel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SosActivation;
