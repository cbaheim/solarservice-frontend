import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const App = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    fetch('https://solarservice-backend-production.up.railway.app/agreements')
      .then((res) => res.json())
      .then((data) => setAgreements(data))
      .catch((err) => console.error('API-feil:', err));
  }, []);

  // Midlertidig dummy-koordinater (du kan senere koble disse til reelle adresser via geokoding)
  const dummyCoords = [
    [59.9139, 10.7522], // Oslo
    [60.3913, 5.3221],  // Bergen
    [63.4305, 10.3951]  // Trondheim
  ];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[61, 10]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {agreements.map((a, idx) => (
          <Marker key={a.ID} position={dummyCoords[idx % dummyCoords.length]}>
            <Popup>
              <strong>{a.Tittel}</strong><br />
              {a.Bedrift}<br />
              Neste: {a["Neste service"]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default App;
