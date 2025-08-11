// src/components/organisms/dashboard/maps/MapPicker.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  GeoJSON,
} from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import { toast } from 'sonner';

// Atur default icon Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type MapPickerProps = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
  className?: string;
  polygon?: any;
};

function FlyToLocation({ coords }: { coords: LatLngLiteral }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 15);
  }, [coords, map]);
  return null;
}

function ClickHandler({
  setCoords,
  polygon,
}: {
  setCoords: (lat: number, lng: number) => void;
  polygon: any;
}) {
  const isInside = (lat: number, lng: number) => {
    if (!polygon?.features?.length) return false;
    return booleanPointInPolygon(point([lng, lat]), polygon.features[0]);
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoords(lat, lng);
      if (!isInside(lat, lng)) {
        toast.warning('Lokasi berada di luar Kecamatan Banyumanik. Geser ke dalam area.');
      }
    },
  });

  return null;
}

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
  polygon,
}: MapPickerProps) {
  const [coords, setCoords] = useState<LatLngLiteral>({ lat, lng });

  const isInside = (lat: number, lng: number) => {
    if (!polygon?.features?.length) return false;
    return booleanPointInPolygon(point([lng, lat]), polygon.features[0]);
  };

  const handleRefreshLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newCoords = { lat: latitude, lng: longitude };
        setCoords(newCoords);
        onChange(latitude, longitude);

        if (!isInside(latitude, longitude)) {
          toast.warning('Lokasi berada di luar Kecamatan Banyumanik. Geser ke dalam area.');
        }
      },
      (err) => {
        toast.error('Gagal mendapatkan lokasi. Pastikan izin lokasi aktif.');
        console.error(err);
      }
    );
  };

  const handleMapClick = (lat: number, lng: number) => {
    setCoords({ lat, lng });
    onChange(lat, lng);
    if (!isInside(lat, lng)) {
      toast.warning('Lokasi berada di luar Kecamatan Banyumanik. Geser ke dalam area.');
    }
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

        {polygon && (
          <GeoJSON
            data={polygon}
            style={{ color: 'green', fillOpacity: 0.3, weight: 2 }}
          />
        )}

        <Marker position={coords} />
        <ClickHandler setCoords={handleMapClick} polygon={polygon} />
        <FlyToLocation coords={coords} />
      </MapContainer>

      <RefreshButton onRefresh={handleRefreshLocation} />
    </div>
  );
}
