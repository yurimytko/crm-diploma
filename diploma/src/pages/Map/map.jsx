import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export  function Map(){
  const [waypoints, setWaypoints] = useState([
    { lat: 34.052235, lng: -118.243683 }, // Example initial Point A
    { lat: 34.062235, lng: -118.253683 }  // Example initial Point B
  ]);
  const [newWaypoint, setNewWaypoint] = useState({ lat: '', lng: '' });

  const handleAddWaypoint = (e) => {
    e.preventDefault();
    if (newWaypoint.lat && newWaypoint.lng) {
      setWaypoints([...waypoints, { lat: parseFloat(newWaypoint.lat), lng: parseFloat(newWaypoint.lng) }]);
      setNewWaypoint({ lat: '', lng: '' });
    }
  };

  const position = [waypoints[0].lat, waypoints[0].lng];

  return (
    <div>
      <h1>Waypoints from Point A to Point B</h1>
      <form onSubmit={handleAddWaypoint}>
        <input
          type="number"
          placeholder="Latitude"
          value={newWaypoint.lat}
          onChange={(e) => setNewWaypoint({ ...newWaypoint, lat: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          value={newWaypoint.lng}
          onChange={(e) => setNewWaypoint({ ...newWaypoint, lng: e.target.value })}
          required
        />
        <button type="submit">Add Waypoint</button>
      </form>
      <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {waypoints.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lng]} />
        ))}
        <Polyline positions={waypoints.map(point => [point.lat, point.lng])} />
      </MapContainer>
    </div>
  );
};

export default Map;
