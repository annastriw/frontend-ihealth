'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Konfigurasi default Leaflet marker (warna biru dari CDN)
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type MapPickerProps = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
  className?: string;
};

// Komponen untuk fly-to saat koordinat berubah
function FlyToLocation({ coords }: { coords: LatLngLiteral }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 15);
  }, [coords, map]);
  return null;
}

// Handler klik pada peta
function ClickHandler({
  setCoords,
}: {
  setCoords: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      setCoords(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Tombol refresh lokasi GPS
function RefreshButton({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="absolute bottom-4 right-4 z-[9999]">
      <button
        type="button"
        onClick={onRefresh}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Refresh Lokasi
      </button>
    </div>
  );
}

export default function MapPicker({
  lat,
  lng,
  onChange,
  className = 'h-64 w-full rounded-lg overflow-hidden relative',
}: MapPickerProps) {
  const [coords, setCoords] = useState<LatLngLiteral>({ lat, lng });

  // Fungsi untuk mengambil lokasi pengguna via GPS
  const handleRefreshLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newCoords = { lat: latitude, lng: longitude };
        setCoords(newCoords);
        onChange(latitude, longitude);
      },
      (err) => {
        alert('Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.');
        console.error(err);
      }
    );
  };

  // Saat user klik peta
  const handleMapClick = (lat: number, lng: number) => {
    setCoords({ lat, lng });
    onChange(lat, lng);
  };

  return (
    <div className={className}>
      <MapContainer
        center={coords}
        zoom={15}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coords} />
        <ClickHandler setCoords={handleMapClick} />
        <FlyToLocation coords={coords} />
      </MapContainer>

      <RefreshButton onRefresh={handleRefreshLocation} />
    </div>
  );
}
