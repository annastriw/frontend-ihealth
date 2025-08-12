"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGetAllUserMap } from "@/http/admin/map/get-user-map";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { GeoJSON } from "react-leaflet";
import { useRouter } from "next/navigation";

// Dynamic imports
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Custom icons
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const orangeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Kelurahan dan RW
const rwByKelurahan = {
  Pedalangan: Array.from({ length: 11 }, (_, i) => `RW ${i + 1}`),
  Padangsari: Array.from({ length: 17 }, (_, i) => `RW ${i + 1}`),
};

type KelurahanType = keyof typeof rwByKelurahan;

export default function DashboardAdminUsersMapsWrapper() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: userMapData, isPending } = useGetAllUserMap(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const defaultPosition = { lat: -7.0562, lng: 110.4381 };
  const [polygon, setPolygon] = useState<any | null>(null);

  useEffect(() => {
    fetch("/maps/banyumanik.geojson")
      .then(res => res.json())
      .then(data => setPolygon(data));
  }, []);

  if (isPending) return <div className="p-6">Loading data pengguna...</div>;

  // Inisialisasi grouped, hanya hitung DM, HT, ALL masing-masing tanpa double count
  const grouped: Record<KelurahanType, Record<string, { DM: number; HT: number; ALL: number }>> = {
    Pedalangan: {},
    Padangsari: {},
  };

  Object.entries(rwByKelurahan).forEach(([kelurahan, rwList]) => {
    rwList.forEach(rw => {
      grouped[kelurahan as KelurahanType][rw] = { DM: 0, HT: 0, ALL: 0 };
    });
  });

  // Hitung statistik per diagnosa, "ALL" hanya hitung di ALL saja
  userMapData?.data?.forEach((user: any) => {
    const kel = user.kelurahan;
    const rw = user.rw;
    const disease = user.disease_type?.toUpperCase();

    if (!kel || !rw || !(kel === "Pedalangan" || kel === "Padangsari") || disease === "GENERAL") return;

    const kelKey = kel as KelurahanType;

    if (!grouped[kelKey]?.[rw]) return;

    if (disease === "DM") grouped[kelKey][rw].DM++;
    else if (disease === "HT") grouped[kelKey][rw].HT++;
    else if (disease === "ALL") grouped[kelKey][rw].ALL++;
  });

  return (
    <div className="space-y-8">
      <MapContainer
        center={[defaultPosition.lat, defaultPosition.lng]}
        zoom={13}
        scrollWheelZoom
        className="h-[80vh] w-full rounded-lg z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {polygon && (
          <GeoJSON
            data={polygon}
            style={{
              color: "#166534",
              fillColor: "rgba(34, 197, 94, 0.2)",
              fillOpacity: 1,
              weight: 2,
            }}
          />
        )}

        {userMapData?.data?.map((user: any) => {
          const lat = parseFloat(user.latitude);
          const lng = parseFloat(user.longitude);
          const disease = user.disease_type?.toUpperCase();

          if (isNaN(lat) || isNaN(lng) || disease === "GENERAL") return null;

          const markerIcon =
            disease === "HT" ? redIcon :
            disease === "ALL" ? orangeIcon :
            disease === "DM" ? yellowIcon :
            undefined;

          const getDiseaseLabel = (type: string) => {
            const t = type.toUpperCase();
            if (t === "HT") return "Hipertensi";
            if (t === "DM") return "Diabetes Melitus";
            if (t === "ALL") return "Diabetes Melitus dan Hipertensi";
            return "-";
          };

          return markerIcon ? (
            <Marker key={user.id} position={[lat, lng]} icon={markerIcon}>
              <Popup>
                <div className="text-sm space-y-1">
                  <p><strong>{user.name}</strong></p>
                  <p>Email: {user.email}</p>
                  <p>Kelurahan: {user.kelurahan}</p>
                  <p>RW: {user.rw}</p>
                  <p>Alamat: {user.address}</p>
                  <p>Penyakit: {getDiseaseLabel(user.disease_type)}</p>
                  <button
                    onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                    className="inline-block mt-2 text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
                  >
                    Lihat Detail
                  </button>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>

      <div className="grid md:grid-cols-2 gap-6">
        {(["Pedalangan", "Padangsari"] as KelurahanType[]).map(kelurahan => (
          <Card key={kelurahan} className="p-4">
            <h3 className="text-lg font-bold capitalize mb-2">{kelurahan}</h3>
            <div className="space-y-1">
              {rwByKelurahan[kelurahan].map(rw => {
                const count = grouped[kelurahan][rw];
                return (
<div
  key={rw}
  className="text-sm border-b pb-3 mb-3 last:border-none last:pb-0 last:mb-0"
>
  <div className="font-medium mb-2 text-gray-700">{rw}</div>

  <div className="space-y-1.5"> {/* gap dikurangi dari 2 ke 1.5 */}
    {/* Hipertensi */}
    <div className="flex justify-between items-center">
      <span className="font-semibold text-red-700">Hipertensi</span>
      <span className="bg-red-100 text-red-800 rounded-lg px-3 py-1 text-xs font-medium min-w-[70px] text-center">
        {count.HT} orang
      </span>
    </div>

    {/* Diabetes Melitus */}
    <div className="flex justify-between items-center">
      <span className="font-semibold text-yellow-700">Diabetes Melitus</span>
      <span className="bg-yellow-100 text-yellow-900 rounded-lg px-3 py-1 text-xs font-medium min-w-[70px] text-center">
        {count.DM} orang
      </span>
    </div>

    {/* DM + HT */}
    <div className="flex justify-between items-center">
      <span className="font-semibold text-orange-700">DM + HT</span>
      <span className="bg-orange-100 text-orange-900 rounded-lg px-3 py-1 text-xs font-medium min-w-[70px] text-center">
        {count.ALL} orang
      </span>
    </div>
  </div>
</div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
