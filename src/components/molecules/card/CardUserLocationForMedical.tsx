"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LatLngExpression } from "leaflet";

// Dinamis import Leaflet (tanpa SSR)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then(mod => mod.GeoJSON), { ssr: false });

// Leaflet CSS
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Atur default icon Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface CardUserLocationProps {
  userId: string;
}

interface LocationData {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  kelurahan: string;
  rw: string;
}

export default function CardUserLocation({ userId }: CardUserLocationProps) {
  const { data: session, status } = useSession();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [polygon, setPolygon] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/maps/banyumanik.geojson")
      .then((res) => res.json())
      .then((data) => setPolygon(data));
  }, []);

  useEffect(() => {
    if (status !== "authenticated" || !session?.access_token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/medical/location/${userId}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setLocation(res.data))
      .catch(() => console.error("Gagal mengambil data lokasi"))
      .finally(() => setLoading(false));
  }, [status, session, userId]);

  if (loading || !location) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Informasi Alamat</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Memuat data lokasi...</p>
        </CardContent>
      </Card>
    );
  }

  const coords: LatLngExpression = [
    parseFloat(location.latitude),
    parseFloat(location.longitude),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Alamat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 w-full rounded-lg overflow-hidden relative z-0">
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
                style={{ color: "green", fillOpacity: 0.3, weight: 2 }}
              />
            )}

            <Marker position={coords} />
          </MapContainer>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Nama Lengkap</p>
          <p className="text-base">{location.name || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Kelurahan</p>
          <p className="text-base">{location.kelurahan || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">RW</p>
          <p className="text-base">{location.rw || "-"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Alamat Lengkap</p>
          <p className="text-base">{location.address || "-"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
