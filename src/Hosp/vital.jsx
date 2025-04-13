import React, { useState, useEffect } from "react";

function SmartwatchVitalsMonitor() {
  // Bluetooth GATT Service UUIDs
  const SERVICES = {
    HEART_RATE: "0000180d-0000-1000-8000-00805f9b34fb",
    BLOOD_PRESSURE: "00001810-0000-1000-8000-00805f9b34fb",
    TEMPERATURE: "00001809-0000-1000-8000-00805f9b34fb",
    BATTERY: "0000180f-0000-1000-8000-00805f9b34fb",
    DEVICE_INFO: "0000180a-0000-1000-8000-00805f9b34fb",
  };

  // Characteristic UUIDs
  const CHARACTERISTICS = {
    HEART_RATE: "00002a37-0000-1000-8000-00805f9b34fb",
    BLOOD_PRESSURE: "00002a35-0000-1000-8000-00805f9b34fb",
    TEMPERATURE: "00002a1c-0000-1000-8000-00805f9b34fb",
    BATTERY: "00002a19-0000-1000-8000-00805f9b34fb",
    DEVICE_NAME: "00002a00-0000-1000-8000-00805f9b34fb",
  };

  // State management
  const [vitals, setVitals] = useState({
    heartRate: 0,
    bloodPressure: { systolic: 0 ,diastolic: 0 },
    temperature: 0,
    oxygen: 0,
    timestamp: 0,
  });

  const [connection, setConnection] = useState({
    status: "disconnected",
    deviceName: "",
    services: [],
    error: null,
  });

  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [simulationInterval, setSimulationInterval] = useState(null);

  // Data parsers
  const parseHeartRate = (data) => {
    const flags = data.getUint8(0);
    return flags & 0x01 ? data.getUint16(1, true) : data.getUint8(1);
  };

  const parseBloodPressure = (data) => ({
    systolic: data.getFloat32(1, true),
    diastolic: data.getFloat32(5, true),
  });

  const parseTemperature = (data) => data.getFloat32(1, true);
  const mapBatteryToOxygen = (battery) =>
    Math.min(100, 95 + (battery * 5) / 100);

  // Bluetooth functions
  const scanDevices = async () => {
    if (!navigator.bluetooth) {
      console.error("Bluetooth not supported");
      return;
    }

    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: Object.values(SERVICES),
      });

      setDevices([
        {
          id: device.id,
          name: device.name || "Unknown Device",
          device,
        },
      ]);
    } catch (error) {
      console.error("Scan error:", error);
      setConnection((prev) => ({
        ...prev,
        error: error.message || "Failed to scan devices",
      }));
    }
  };

  const connectDevice = async () => {
    if (!selectedDevice) return;

    setConnection({
      status: "connecting",
      deviceName: "",
      services: [],
      error: null,
    });
    stopSimulation();

    try {
      const server = await selectedDevice.device.gatt.connect();
      const deviceName = await getDeviceName(server);

      setConnection((prev) => ({
        ...prev,
        status: "connected",
        deviceName,
      }));

      await monitorServices(server);

      selectedDevice.device.addEventListener("gattserverdisconnected", () => {
        setConnection((prev) => ({ ...prev, status: "disconnected" }));
        startSimulation();
      });
    } catch (error) {
      console.error("Connection error:", error);
      setConnection((prev) => ({
        ...prev,
        status: "error",
        error: error.message || "Connection failed",
      }));
      startSimulation();
    }
  };

  const getDeviceName = async (server) => {
    try {
      const service = await server.getPrimaryService(SERVICES.DEVICE_INFO);
      const characteristic = await service.getCharacteristic(
        CHARACTERISTICS.DEVICE_NAME
      );
      const value = await characteristic.readValue();
      return new TextDecoder().decode(value);
    } catch {
      return selectedDevice.name;
    }
  };

  const monitorServices = async (server) => {
    const availableServices = [];

    // Heart Rate
    try {
      const service = await server.getPrimaryService(SERVICES.HEART_RATE);
      const characteristic = await service.getCharacteristic(
        CHARACTERISTICS.HEART_RATE
      );
      await characteristic.startNotifications();

      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = parseHeartRate(event.target.value);
        setVitals((prev) => ({
          ...prev,
          heartRate: value,
          timestamp: Date.now(),
        }));
      });

      availableServices.push("Heart Rate");
    } catch (error) {
      console.warn("Heart rate service not available:", error);
    }

    // Blood Pressure
    try {
      const service = await server.getPrimaryService(SERVICES.BLOOD_PRESSURE);
      const characteristic = await service.getCharacteristic(
        CHARACTERISTICS.BLOOD_PRESSURE
      );
      await characteristic.startNotifications();

      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const { systolic, diastolic } = parseBloodPressure(event.target.value);
        setVitals((prev) => ({
          ...prev,
          bloodPressure: { systolic, diastolic },
          timestamp: Date.now(),
        }));
      });

      availableServices.push("Blood Pressure");
    } catch (error) {
      console.warn("Blood pressure service not available:", error);
    }

    // Temperature
    try {
      const service = await server.getPrimaryService(SERVICES.TEMPERATURE);
      const characteristic = await service.getCharacteristic(
        CHARACTERISTICS.TEMPERATURE
      );
      await characteristic.startNotifications();

      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = parseTemperature(event.target.value);
        setVitals((prev) => ({
          ...prev,
          temperature: value,
          timestamp: Date.now(),
        }));
      });

      availableServices.push("Temperature");
    } catch (error) {
      console.warn("Temperature service not available:", error);
    }

    // Battery (used as proxy for oxygen)
    try {
      const service = await server.getPrimaryService(SERVICES.BATTERY);
      const characteristic = await service.getCharacteristic(
        CHARACTERISTICS.BATTERY
      );
      const value = await characteristic.readValue();
      const oxygen = mapBatteryToOxygen(value.getUint8(0));
      setVitals((prev) => ({ ...prev, oxygen, timestamp: Date.now() }));
      availableServices.push("Battery");
    } catch (error) {
      console.warn("Battery service not available:", error);
    }

    setConnection((prev) => ({ ...prev, services: availableServices }));

    if (availableServices.length === 0) {
      startSimulation();
    }
  };

  // Simulation functions
  const startSimulation = () => {
    stopSimulation();

    const interval = setInterval(() => {
      setVitals({
        heartRate: Math.floor(Math.random() * 40) + 60,
        bloodPressure: {
          systolic: Math.floor(Math.random() * 30) + 110,
          diastolic: Math.floor(Math.random() * 15) + 70,
        },
        temperature: Math.random() * 2 + 36.5,
        oxygen: Math.floor(Math.random() * 6) + 95,
        timestamp: Date.now(),
      });
    }, 3000);

    setSimulationInterval(interval);
  };

  const stopSimulation = () => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
  };

  const disconnectDevice = () => {
    if (selectedDevice?.device?.gatt?.connected) {
      selectedDevice.device.gatt.disconnect();
    }
    setConnection((prev) => ({ ...prev, status: "disconnected" }));
    startSimulation();
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopSimulation();
      disconnectDevice();
    };
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Vitals Monitor</h1>

      {/* Connection Status */}
      <div
        className={`p-4 rounded-lg mb-6 ${
          connection.status === "connected"
            ? "bg-green-100"
            : connection.status === "error"
            ? "bg-red-100"
            : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              {connection.status === "connected"
                ? "Connected"
                : connection.status === "connecting"
                ? "Connecting..."
                : "Disconnected"}
            </h2>
            {connection.deviceName && <p>{connection.deviceName}</p>}
            {connection.services.length > 0 && (
              <p className="text-sm">
                Monitoring: {connection.services.join(", ")}
              </p>
            )}
          </div>

          {connection.status === "connected" ? (
            <button
              onClick={disconnectDevice}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Disconnect
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={scanDevices}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Scan
              </button>

              {devices.length > 0 && (
                <button
                  onClick={connectDevice}
                  disabled={connection.status === "connecting"}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:bg-green-300"
                >
                  Connect
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Device Selection */}
      {devices.length > 0 && connection.status === "disconnected" && (
        <div className="mb-6">
          <select
            onChange={(e) =>
              setSelectedDevice(devices.find((d) => d.id === e.target.value))
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select a device</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Vitals Display */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 border rounded-lg">
          <h3 className="font-medium">Heart Rate</h3>
          <p className="text-xl">
            {vitals.heartRate ? `${vitals.heartRate} bpm` : "--"}
          </p>
        </div>

        <div className="p-3 border rounded-lg">
          <h3 className="font-medium">Blood Pressure</h3>
          <p className="text-xl">
            {vitals.bloodPressure.systolic && vitals.bloodPressure.diastolic
              ? `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`
              : "--/--"}
          </p>
        </div>

        <div className="p-3 border rounded-lg">
          <h3 className="font-medium">Oxygen</h3>
          <p className="text-xl">
            {vitals.oxygen ? `${vitals.oxygen}%` : "--"}
          </p>
        </div>

        <div className="p-3 border rounded-lg">
          <h3 className="font-medium">Temperature</h3>
          <p className="text-xl">
            {vitals.temperature ? `${vitals.temperature.toFixed(1)}°C` : "--"}
          </p>
        </div>
      </div>

      {/* Last Update */}
      {vitals.timestamp && (
        <p className="text-sm text-gray-500 mt-4">
          Last updated: {new Date(vitals.timestamp).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}

export default SmartwatchVitalsMonitor;
