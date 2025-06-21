import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marker-ikon fiks (Leaflet trenger eksplisitt URL for default ikon)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function App() {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    fetch("https://solarservice-backend-production.up.railway.app/agreements")
      .then((res) => res.json())
      .then((data) => setAgreements(data))
      .catch((err) => console.error("Klarte ikke hente data:", err));
  }, []);

  // Dummy plasseringer – du kan senere bruke koordinater fra Supabase
  const dummyCoordinates = [
    [59.91, 10.75], // Oslo
    [60.39, 5.32],  // Bergen
    [58.97, 5.73],  // Stavanger
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>SolarService Avtaler</h1>
      <MapContainer center={[61, 8]} zoom={5} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {agreements.map((item, index) => (
          <Marker key={item.ID} position={dummyCoordinates[index % dummyCoordinates.length]}>
            <Popup>
              <strong>{item.Tittel}</strong>
              <br />
              Firma: {item.Bedrift}
              <br />
              Neste service: {item["Neste service"]}
              <br />
              Status: {item.Status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
