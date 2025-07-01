"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMapComponent() {
  return (
    <MapContainer
      center={[-6.2, 106.8]} // Jakarta
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[-6.2, 106.8]}>
        <Popup>Lokasi Anda</Popup>
      </Marker>
    </MapContainer>
  );
}
