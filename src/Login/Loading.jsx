import React, { useEffect, useState } from "react";
import "./Login.css";
import loading from "../assets/loader.gif";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [hide, setHide] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate("/getstarted");
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleGetStarted();
    }
    setLastTap(now);
  };

  return (
    <div
      className={`splash-screen ${hide ? "hide" : ""}`}
      onClick={handleDoubleTap}
    >
      <div className="icon">
        <img src={loading} alt="loading..." />
      </div>
      <div className="title">RescuX</div>
      <div className="description">AI - Powered Emergency Response System</div>
    </div>
  );
};

export default Loading;
