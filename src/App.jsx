import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

// Dummy koordinater for visualisering (du kan knytte ID til reelle koordinater senere)
const koordinater = {
  "Solenergi AS": [59.9139, 10.7522],       // Oslo
  "Borettslag Vest": [60.39299, 5.32415],   // Bergen
  "Takpartner Øst": [59.1312, 11.3871],     // Halden
};

const App = () => {
  const [avtaler, setAvtaler] = useState([]);

  useEffect(() => {
    fetch("https://solarservice-backend-production.up.railway.app/agreements")
      .then((res) => res.json())
      .then((data) => setAvtaler(data))
      .catch((err) => console.error("Feil ved henting av data:", err));
  }, []);

  return (
    <div className="container">
      <h1>Serviceavtaler – SolarService</h1>

      <div className="innhold">
        <div className="kart">
          <MapContainer center={[62.5, 10.5]} zoom={5} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {avtaler.map((avtale) => {
              const pos = koordinater[avtale.Bedrift] || [61, 10];
              return (
                <Marker key={avtale.ID} position={pos} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })}>
                  <Popup>
                    <strong>{avtale.Tittel}</strong><br />
                    {avtale.Bedrift}<br />
                    Neste service: {avtale["Neste service"]}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="liste">
          <h2>Liste over avtaler</h2>
          <table>
            <thead>
              <tr>
                <th>Tittel</th>
                <th>Bedrift</th>
                <th>Neste service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {avtaler.map((avtale) => (
                <tr key={avtale.ID}>
                  <td>{avtale.Tittel}</td>
                  <td>{avtale.Bedrift}</td>
                  <td>{avtale["Neste service"]}</td>
                  <td>{avtale.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
