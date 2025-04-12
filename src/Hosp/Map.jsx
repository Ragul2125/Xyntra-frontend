import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./Hospital.css"; // Import the CSS
import { useNavigate } from "react-router-dom";

const defaultCenter = {
  lat: 28.6139, // Delhi
  lng: 77.209,
};

const DeliveryMap = () => {
  const [deliveryLocation] = useState({
    lat: 28.614,
    lng: 77.208,
  });

  const [restaurantLocation] = useState({
    lat: 28.612,
    lng: 77.21,
  });

  const mapRef = useRef(null);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.panTo(deliveryLocation);
    }
  };

  const onLoad = (map) => {
    mapRef.current = map;
  };
  
  const Navigate = useNavigate();
  const handlemapclose = ()=>{
    Navigate('/hospital')
  }
  return (
    <div className="map-page-wrapper">
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyAqs5uPsagkNSZRj0iFrOvCdj-tiLJcf88">
          <GoogleMap
            mapContainerClassName="map-frame"
            center={defaultCenter}
            zoom={15}
            onLoad={onLoad}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: true,
            }}
          >
            <Marker position={restaurantLocation} label="R" />
            <Marker
              position={deliveryLocation}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                scaledSize: { width: 40, height: 40 },
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      <button className="recenter-button" onClick={handleRecenter}>
        Recenter 🚑
      </button>

      <div className="container-details">
        {/* You can add dynamic content or info here */}
        <div className="header">
            <div className="id">
                <h3>P-22334</h3>
            </div>
            <div className="condition">
                <h3>🔴 Critical</h3>
            </div>
        </div>
        <div className="summary">
            <h4>Summary</h4>
            <p>Chest pain, short breath
            Chest pain, short breath
            </p>
        </div>
        <div className="btn" onClick={handlemapclose}>
            Close
            <span>x</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;
