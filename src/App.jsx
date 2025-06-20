import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function App() {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/agreements")
      .then(res => setAgreements(res.data));
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [11, 64.5],
      zoom: 4
    });

    agreements.forEach(a => {
      new mapboxgl.Marker()
        .setLngLat([a.lon, a.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<b>${a.name}</b><br>${a.status}<br>${a.next_service}`))
        .addTo(map);
    });

    return () => map.remove();
  }, [agreements]);

  return (
    <div>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
      <table>
        <thead>
          <tr>
            <th>Navn</th><th>Status</th><th>Neste service</th>
          </tr>
        </thead>
        <tbody>
          {agreements.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.status}</td>
              <td>{a.next_service}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
